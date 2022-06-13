import React from 'react';
import {View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Routes from '../../navigation/Routes';
import HomeScreen from '../home';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

const DrawerMenu = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={Routes.HOME}>
      <Drawer.Screen name={Routes.HOME} component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerMenu;
