import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef, isMountedRef} from './index';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/login_signup/LoginScreen';
import HomeScreen from '../screens/home';
import DrawerMenu from '../screens/drawerMenu';
import ProductDetailScreen from '../screens/productDetail';
import FavoriteScreen from '../screens/favorite';
import UserProfileScreen from '../screens/userProfile';
import EditUserProfileScreen from '../screens/editUserProfile';
import Routes from './Routes';

const Stack = createStackNavigator();

const RootNavigation = () => {
  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={Routes.LOGIN_SCREEN}>
        <Stack.Screen name={Routes.LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen name={Routes.DRAWER_MENU} component={DrawerMenu} />
        <Stack.Screen name={Routes.HOME_SCREEN} component={HomeScreen} />
        <Stack.Screen
          name={Routes.FAVORITE_SCREEN}
          component={FavoriteScreen}
        />
        <Stack.Screen
          name={Routes.PRODUCT_DETAIL_SCREEN}
          component={ProductDetailScreen}
        />
        <Stack.Screen
          name={Routes.USER_PROFILE_SCREEN}
          component={UserProfileScreen}
        />
        <Stack.Screen
          name={Routes.EDIT_USER_PROFILE_SCREEN}
          component={EditUserProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
