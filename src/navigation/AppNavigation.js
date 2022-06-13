import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef, isMountedRef} from './index';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import LoginScreen from '../screens/login_signup/LoginScreen';
import HomeScreen from '../screens/home';
import DrawerMenu from '../screens/drawerMenu';
import Routes from './Routes';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const RootNavigation = () => {
  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

  // const DrawerMenu = () => {
  //   return (
  //     <Drawer.Navigator screenOptions={{headerShown: false}}>
  //       <Drawer.Screen name={Routes.HOME} component={HomeScreen} />
  //     </Drawer.Navigator>
  //   );
  // };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={Routes.LOGIN_SCREEN}>
        <Stack.Screen name={Routes.LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen name={Routes.DRAWER} component={DrawerMenu} />
        <Stack.Screen name={Routes.HOME} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{headerShown: false}}>
    //     <Stack.Screen name={Routes.LOGIN_SCREEN} component={LoginScreen} />
    //     <Stack.Screen name={Routes.DRAWER} component={DrawerMenu} />
    //     <Stack.Screen name={Routes.HOME} component={HomeScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default RootNavigation;
