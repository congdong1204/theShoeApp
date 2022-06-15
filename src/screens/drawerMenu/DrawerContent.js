import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Color from '../../constants/Color';
import NavigationService from '../../navigation/index';
import Routes from '../../navigation/Routes/index';

Entypo.loadFont();
FontAwesome.loadFont();
const DrawerContent = () => {
  const userInfo = useSelector(state => state.authen.userInfo);
  return (
    <View style={styles.container}>
      <DrawerContentScrollView>
        <View style={styles.userWrapper}>
          <Image
            style={styles.avatar}
            resizeMode="cover"
            source={{
              uri: userInfo.avatar,
            }}
          />
          <View style={styles.userInfoWrapper}>
            <Text style={styles.userName}>{userInfo.name}</Text>
            <TouchableOpacity>
              <Text style={styles.viewProfileText}>View your profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.navigateContainer}>
          <TouchableOpacity
            style={styles.navigateWrapper}
            onPress={() => NavigationService.navigate(Routes.HOME_SCREEN)}>
            <Entypo name="menu" size={26} color={Color.primary} />
            <Text style={styles.navigateText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigateWrapper}
            onPress={() => NavigationService.navigate(Routes.FAVORITE_SCREEN)}>
            <FontAwesome name="heart" size={20} color={Color.primary} />
            <Text style={styles.navigateText}>Your Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigateWrapper}>
            <Entypo name="shopping-cart" size={24} color={Color.primary} />
            <Text style={styles.navigateText}>Your Cart</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  userInfoWrapper: {
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  userName: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: Color.textDark,
  },
  viewProfileText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: Color.primary,
  },
  navigateContainer: {
    marginLeft: 12,
    marginTop: 24,
  },
  navigateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  navigateText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    marginLeft: 12,
    color: Color.primary,
  },
});

export default DrawerContent;
