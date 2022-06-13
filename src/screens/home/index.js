import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import Header from '../../components/Header';
import {
  fetchCategories,
  fetchAllProducts,
  fetchProductsByCategory,
} from '../../slice/ProductSlice';
import {fetchUserProfile} from '../../slice/AuthSlice';
import Color from '../../constants/Color';
import NavigationService from '../../navigation';
import Routes from '../../navigation/Routes';

const HomeScreen = ({navigation}) => {
  const categories = useSelector(state => state.product.categories);
  const productsByCategory = useSelector(
    state => state.product.productsByCategory,
  );
  const dispatch = useDispatch();
  const [selectCategory, setSelectCategory] = useState('ADIDAS');

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchCategories());
    dispatch(fetchProductsByCategory('ADIDAS'));
    dispatch(fetchUserProfile());
  }, []);

  const handlePressCategory = item => {
    setSelectCategory(item);
    dispatch(fetchProductsByCategory(item));
  };

  const renderCategories = item => {
    return (
      <TouchableOpacity
        onPress={() => handlePressCategory(item.id)}
        style={
          selectCategory === item.id
            ? styles.categoryWrapperSelected
            : styles.categoryWrapper
        }>
        <Text
          style={
            selectCategory === item.id
              ? styles.categoryTextSelected
              : styles.categoryText
          }>
          {item.category}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderProduct = item => {
    return (
      <TouchableOpacity style={styles.productWapper}>
        <Image
          source={{uri: item.image}}
          resizeMode="cover"
          style={styles.productImage}
        />
        <Text style={styles.productTitle}>{item.name}</Text>
        <View style={styles.priceWrapper}>
          <Text style={styles.productPrice}>${item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <Header
        title="Home Screen"
        leftIcon="menu"
        onPressLeft={() => navigation.toggleDrawer()}
      />
      <View style={styles.categoryContainer}>
        <FlatList
          data={categories}
          renderItem={({item}) => renderCategories(item)}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.productsContainer}>
        <FlatList
          data={productsByCategory}
          renderItem={({item}) => renderProduct(item)}
          numColumns={2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Color.background,
  },
  categoryContainer: {
    marginBottom: 12,
  },
  categoryWrapper: {
    backgroundColor: Color.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 12,
    borderRadius: 8,
  },
  categoryWrapperSelected: {
    backgroundColor: Color.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 12,
    borderRadius: 8,
  },
  categoryText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    color: Color.textDark,
  },
  categoryTextSelected: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    color: Color.textWhite,
  },
  productsContainer: {
    flex: 1,
  },
  productWapper: {
    flex: 1,
    height: 220,
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
  },
  productImage: {
    width: '100%',
    height: 120,
  },
  productTitle: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    color: Color.textDark,
  },
  priceWrapper: {
    flex: 1,
    marginTop: 8,
    justifyContent: 'flex-end',
  },
  productPrice: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 16,
    color: Color.textDark,
  },
});

export default HomeScreen;
