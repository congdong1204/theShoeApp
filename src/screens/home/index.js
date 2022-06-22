import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
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
const screenWidth = Dimensions.get('window').width;

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

  useEffect(() => {
    console.log(loading);
    dispatch(fetchProductsByCategory('ADIDAS'));
    const delay = async () => {
      await setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    delay();
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

  const Banner = ({
    title = 'Title',
    description = 'Description',
    image,
    backgroundColor = 'pink',
  }) => {
    return (
      <View
        style={{...styles.bannerContainer, backgroundColor: backgroundColor}}>
        <Text style={styles.bannerTitle}>{title}</Text>
        <Text style={styles.bannerDescription}>{description}</Text>
        <View style={styles.bannerImageWrapper}>
          <Image
            style={styles.bannerImage}
            source={{
              uri: image,
            }}
          />
        </View>
      </View>
    );
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
      <ScrollView>
        <ScrollView
          style={{flex: 1}}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <Banner
            title="49%"
            description="Discount"
            backgroundColor="#feb864"
            image="http://svcy3.myclass.vn/images/nike-flyknit.png"
          />
          <Banner
            title="2022"
            description="Best seller"
            backgroundColor="#CDDC39"
            image="http://svcy3.myclass.vn/images/adidas-tenisky-super-star.png"
          />
          <Banner
            title="Hot"
            description="Super Deal"
            backgroundColor="#bf81ee"
            image="http://svcy3.myclass.vn/images/adidas-prophere-black-white.png"
          />
        </ScrollView>
        <View>
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
      </ScrollView>
      {loading && <LoadingView />}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Color.background,
  },
  categoryWrapper: {
    backgroundColor: Color.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 12,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryWrapperSelected: {
    backgroundColor: Color.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 12,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
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
    width: screenWidth / 2 - 24,
    height: 220,
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: 'black',
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
  bannerContainer: {
    marginTop: 12,
    marginLeft: 12,
    marginBottom: 16,
    width: 300,
    height: 100,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 28,
    color: Color.textWhite,
  },
  bannerDescription: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 20,
    color: Color.textWhite,
  },
  bannerImageWrapper: {
    position: 'absolute',
    right: 12,
    top: -12,
  },
  bannerImage: {
    width: 160,
    height: 100,
    transform: [{rotate: '-15deg'}],
  },
});

export default HomeScreen;
