import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import NavigationService from '../../navigation';
import Header from '../../components/Header';
import Color from '../../constants/Color';

Feather.loadFont();

const ProductDetailScreen = ({route}) => {
  console.log('render product detail screen...');
  const {product} = route.params;
  const [size, setSize] = useState('');
  const renderSizeItem = item => {
    return (
      <TouchableOpacity
        onPress={() => setSize(item)}
        style={{
          ...styles.sizeItemWrapper,
          backgroundColor: size === item ? Color.accent : Color.white,
        }}>
        <Text
          style={{
            ...styles.sizetext,
            color: size === item ? Color.textWhite : Color.textDark,
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.screen}>
      <Header
        title="Product Detail"
        leftIcon="chevron-left"
        rightIcon="shopping-cart"
        onPressLeft={() => NavigationService.goBack()}
      />
      <ScrollView style={styles.productDetailContainer}>
        <View style={styles.productImageWrapper}>
          <Image
            resizeMode="contain"
            source={{uri: product.image}}
            style={styles.productImage}
          />
        </View>
        <View style={styles.productDetailWrapper}>
          <Text style={styles.productTitle}>{product.name}</Text>
          <Text style={styles.productPrice}>${product.price}</Text>
          <View style={styles.sizeWrapper}>
            <Text style={styles.sizeTitle}>Size</Text>
            <FlatList
              data={product.size}
              renderItem={({item}) => renderSizeItem(item)}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>
          <TouchableOpacity style={styles.addCartButtonWrapper}>
            <Feather size={24} name="shopping-bag" color={Color.white} />
            <Text style={styles.addCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Color.background,
  },
  productDetailContainer: {
    flex: 1,
  },
  productImageWrapper: {
    height: 200,
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    marginHorizontal: 12,
    borderRadius: 16,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'white',
    elevation: 5,
  },
  productImage: {
    width: 250,
    height: 250,
  },
  productDetailWrapper: {
    marginHorizontal: 12,
    marginTop: 16,
  },
  productTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 18,
    color: Color.primary,
  },
  productPrice: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: Color.primary,
    marginTop: 8,
  },
  sizeWrapper: {
    marginTop: 16,
  },
  sizeTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 18,
    color: Color.primary,
    marginBottom: 12,
  },
  sizeItemWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 48,
    marginRight: 12,
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
  sizetext: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
  },
  descriptionTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 18,
    color: Color.primary,
    marginBottom: 12,
  },
  descriptionText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: Color.textDark,
  },
  addCartButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: Color.accent,
    borderRadius: 8,
  },
  addCartText: {
    marginLeft: 12,
    color: Color.textWhite,
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
  },
});

export default ProductDetailScreen;
