import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';

import Header from '../../components/Header';
import Color from '../../constants/Color';
import Routes from '../../navigation/Routes';
import NavigationService from '../../navigation';

const UserProfileScreen = () => {
  const userInfo = useSelector(state => state.authen.userInfo);

  const UserInfo = ({label, content}) => (
    <View style={styles.userInfoWrapper}>
      <Text style={styles.labelText}>{label}</Text>
      <Text style={styles.contentText}>{content}</Text>
    </View>
  );

  return (
    <View style={styles.screen}>
      <Header
        title="My Account"
        rightIcon="edit"
        onPressRight={() =>
          NavigationService.navigate(Routes.EDIT_USER_PROFILE_SCREEN)
        }
        leftIcon="menu"
        onPressLeft={() => NavigationService.toggleDrawer()}
      />
      <ScrollView style={styles.userInfoContainer}>
        <UserInfo
          label="Full name"
          content={userInfo.name ? userInfo.name : 'null'}
        />
        <UserInfo
          label="Phone Number"
          content={userInfo.phone ? userInfo.phone : 'null'}
        />
        <UserInfo
          label="Gender"
          content={userInfo.gender ? 'Male' : 'Female'}
        />
        <UserInfo label="Email" content={userInfo.email} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Color.background,
  },
  userInfoContainer: {
    flex: 1,
    marginTop: 12,
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Color.white,
    marginHorizontal: 12,
    padding: 16,
    marginBottom: 24,
    borderRadius: 12,
    shadowColor: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    backgroundColor: 'white',
    elevation: 5,
  },
  labelText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: Color.textLight,
  },
  contentText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: Color.textDark,
  },
});

export default UserProfileScreen;
