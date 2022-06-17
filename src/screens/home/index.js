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
import Entypo from 'react-native-vector-icons/Entypo';

import Header from '../../components/Header';
import {
  fetchProductsByCategory,
  fetchFavoriteProducts,
} from '../../slice/ProductSlice';
import Color from '../../constants/Color';
import NavigationService from '../../navigation';
import Routes from '../../navigation/Routes';
import LoadingView from '../../components/LoadingView';

Entypo.loadFont();

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  console.log('render home screen...');
  const categories = useSelector(state => state.product.categories);
  const productsByCategory = useSelector(
    state => state.product.productsByCategory,
  );
  const token = useSelector(state => state.authen.token);
  const favoriteProducts = useSelector(state => state.product.favoriteProducts);
  const dispatch = useDispatch();
  const [selectCategory, setSelectCategory] = useState('ADIDAS');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    dispatch(fetchProductsByCategory('ADIDAS'));
    setLoading(false);
  }, []);

  const handlePressCategory = item => {
    setSelectCategory(item);
    dispatch(fetchProductsByCategory(item));
  };

  const handleFavorites = async id => {
    if (favoriteProducts.find(prod => prod.id === id)) {
      await fetch(`http://svcy3.myclass.vn/api/Users/unlike?productId=${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      await fetch(`http://svcy3.myclass.vn/api/Users/like?productId=${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    await dispatch(fetchFavoriteProducts());
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
      <TouchableOpacity
        style={styles.productWapper}
        onPress={() =>
          NavigationService.navigate(Routes.PRODUCT_DETAIL_SCREEN, {
            product: item,
          })
        }>
        <Image
          source={{uri: item.image}}
          resizeMode="cover"
          style={styles.productImage}
        />
        <Text style={styles.productTitle}>{item.name}</Text>
        <View style={styles.priceWrapper}>
          <Text style={styles.productPrice}>${item.price}</Text>
        </View>
        <TouchableOpacity
          style={styles.favoriteWrapper}
          onPress={() => handleFavorites(item.id)}>
          <Entypo
            name={
              favoriteProducts.find(prod => prod.id === item.id)
                ? 'check'
                : 'plus'
            }
            size={24}
            color={Color.white}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <Header
        title="Home Screen"
        leftIcon="menu"
        onPressLeft={() => NavigationService.toggleDrawer()}
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
          showsVerticalScrollIndicator={false}
        />
      </View>
      {loading && <LoadingView />}
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
    padding: 12,
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
  favoriteWrapper: {
    backgroundColor: Color.accent,
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 60,
    height: 32,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
