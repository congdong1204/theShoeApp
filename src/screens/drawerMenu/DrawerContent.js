import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Color from '../../constants/Color';
import NavigationService from '../../navigation/index';
import Routes from '../../navigation/Routes/index';

Entypo.loadFont();
FontAwesome.loadFont();
Feather.loadFont();
Ionicons.loadFont();
const DrawerContent = () => {
  const userInfo = useSelector(state => state.authen.userInfo);
  const handleLogout = () => {
    AsyncStorage.removeItem('userData');
    NavigationService.navigate(Routes.LOGIN_SCREEN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userWrapper}>
        <Image
          style={styles.avatar}
          resizeMode="cover"
          source={{
            // uri: userInfo.avatar,
            uri: 'https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.6435-9/45917308_2254833041413498_1343062047557943296_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=jnooy7yoeiwAX9i-i_u&_nc_oc=AQntapsWQvjmG3d3TWsWIT82Rf599-mge45nARli0POgrb-SL_AjD9GM7Qth_8SBCy4&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT8mFKKZzo9F6ROUcUNwnV-GCTXrT3EPJBr0SElVjOQWyg&oe=62D3D826',
          }}
        />
        <Text style={styles.userName}>{userInfo.name}</Text>
      </View>

      <View style={styles.navigateContainer}>
        <TouchableOpacity
          style={styles.navigateWrapper}
          onPress={() => NavigationService.navigate(Routes.HOME_SCREEN)}>
          <Feather name="home" size={26} color={Color.primary} />
          <Text style={styles.navigateText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigateWrapper}
          onPress={() =>
            NavigationService.navigate(Routes.USER_PROFILE_SCREEN)
          }>
          <Feather name="user" size={26} color={Color.primary} />
          <Text style={styles.navigateText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigateWrapper}
          onPress={() => NavigationService.navigate(Routes.FAVORITE_SCREEN)}>
          <FontAwesome name="heart-o" size={26} color={Color.primary} />
          <Text style={styles.navigateText}>Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigateWrapper}>
          <Feather name="shopping-bag" size={26} color={Color.primary} />
          <Text style={styles.navigateText}>My Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigateWrapper}>
          <Ionicons
            name="notifications-outline"
            size={26}
            color={Color.primary}
          />
          <Text style={styles.navigateText}>Notification</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutWrapper} onPress={handleLogout}>
        <Feather name="log-out" size={26} color={Color.primary} />
        <Text style={styles.navigateText}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  userWrapper: {
    alignItems: 'center',
    marginTop: 48,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  userName: {
    marginTop: 8,
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    color: Color.textDark,
  },
  navigateContainer: {
    marginLeft: 16,
    marginBottom: 168,
  },
  navigateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  navigateText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    marginLeft: 16,
    color: Color.primary,
  },
  logoutWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginBottom: Platform.OS === 'android' ? 16 : 0,
  },
});

export default DrawerContent;
