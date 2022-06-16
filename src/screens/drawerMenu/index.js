import React from 'react';
import {View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Routes from '../../navigation/Routes';
import HomeScreen from '../home';
import FavoriteScreen from '../favorite';
import DrawerContent from './DrawerContent';
import UserProfileScreen from '../userProfile';
import EditUserProfileScreen from '../editUserProfile';

const Drawer = createDrawerNavigator();

const DrawerMenu = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
      }}
      initialRouteName={Routes.HOME_SCREEN}>
      <Drawer.Screen name={Routes.HOME_SCREEN} component={HomeScreen} />
      <Drawer.Screen name={Routes.FAVORITE_SCREEN} component={FavoriteScreen} />
      <Drawer.Screen
        name={Routes.USER_PROFILE_SCREEN}
        component={UserProfileScreen}
      />
      <Drawer.Screen
        name={Routes.EDIT_USER_PROFILE_SCREEN}
        component={EditUserProfileScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerMenu;
