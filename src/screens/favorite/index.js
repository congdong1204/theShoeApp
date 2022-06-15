import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Header from '../../components/Header';
import Color from '../../constants/Color';
import NavigationService from '../../navigation';
import Routes from '../../navigation/Routes';
import {fetchFavoriteProducts} from '../../slice/ProductSlice';

FontAwesome.loadFont();

const FavoriteScreen = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(state => state.product.allProducts);
  const token = useSelector(state => state.authen.token);
  const favoriteProducts = useSelector(state => state.product.favoriteProducts);
  const newFavoriteProducts = allProducts.filter(prod =>
    favoriteProducts.find(item => item.id === prod.id),
  );

  const handleUnlike = async id => {
    await fetch(`http://svcy3.myclass.vn/api/Users/unlike?productId=${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await dispatch(fetchFavoriteProducts());
  };

  const renderFavoriteProduct = prod => {
    return (
      <TouchableOpacity
        style={styles.favoriteProductWrapper}
        onPress={() =>
          NavigationService.navigate(Routes.PRODUCT_DETAIL_SCREEN, {
            product: {...prod, size: prod.size.slice(1, -1).split(',')},
          })
        }>
        <View style={styles.productImageWrapper}>
          <Image
            resizeMode="contain"
            style={styles.productImage}
            source={{uri: prod.image}}
          />
        </View>
        <View style={styles.productDetailWrapper}>
          <Text style={styles.productTitle}>{prod.name}</Text>
          <Text style={styles.productPrice}>${prod.price}</Text>
        </View>
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => handleUnlike(prod.id)}>
          <FontAwesome name="heart" size={24} color={Color.accent} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <Header
        title="Your Favorite"
        leftIcon="menu"
        onPressLeft={() => NavigationService.toggleDrawer()}
      />
      <View style={styles.favoriteListContainer}>
        <FlatList
          data={newFavoriteProducts}
          renderItem={({item}) => renderFavoriteProduct(item)}
          showsVerticalScrollIndicator={false}
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
  favoriteListContainer: {
    flex: 1,
  },
  favoriteProductWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 20,
    padding: 12,
    backgroundColor: Color.white,
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
    borderRadius: 12,
  },
  productImageWrapper: {
    backgroundColor: Color.background,
    borderRadius: 12,
  },
  productImage: {
    width: 120,
    height: 100,
  },
  productDetailWrapper: {
    marginHorizontal: 12,
    justifyContent: 'space-between',
    flex: 1,
  },
  productTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: Color.primary,
    marginBottom: 12,
  },
  productPrice: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 18,
    color: Color.primary,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    width: 42,
    height: 42,
    borderRadius: 21,
    width: 42,
  },
});

export default FavoriteScreen;
