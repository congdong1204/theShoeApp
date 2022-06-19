import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Color from '../../constants/Color';
import LoadingView from '../../components/LoadingView';
import NavigationService from '../../navigation';
import Routes from '../../navigation/Routes';
import authSlice from '../..//slice/AuthSlice';
import {fetchUserProfile} from '../../slice/AuthSlice';
import {
  fetchCategories,
  fetchAllProducts,
  fetchFavoriteProducts,
} from '../../slice/ProductSlice';

MaterialCommunityIcons.loadFont();
const StartUpScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      console.log(userData);
      if (!userData) {
        NavigationService.navigate(Routes.LOGIN_SCREEN);
        return;
      }
      const transformData = JSON.parse(userData);
      const {token} = transformData;
      dispatch(authSlice.actions.getUserToken(token));
      await dispatch(fetchUserProfile());
      await dispatch(fetchCategories());
      await dispatch(fetchAllProducts());
      await dispatch(fetchFavoriteProducts());
      NavigationService.navigate(Routes.DRAWER_MENU);
    };
    tryLogin();
  }, []);
  return (
    <View style={styles.screen}>
      <View style={styles.logoContainer}>
        <View style={styles.logoWrapper}>
          <MaterialCommunityIcons
            name="shoe-sneaker"
            size={72}
            color={Color.white}
          />
        </View>
        <Text style={styles.logoText}>ShoeApp</Text>
      </View>
      {true && <LoadingView />}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.accent,
    height: 90,
    width: 90,
    borderRadius: 16,
  },
  logoText: {
    marginLeft: 16,
    color: Color.accent,
    fontSize: 42,
    fontFamily: 'Manrope-Bold',
  },
});

export default StartUpScreen;
