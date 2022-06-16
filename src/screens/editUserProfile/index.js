import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useSelector, useDispatch} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';

import Header from '../../components/Header';
import Color from '../../constants/Color';
import Routes from '../../navigation/Routes';
import NavigationService from '../../navigation';
import Input from '../../components/Input';
import {fetchUserProfile} from '../../slice/AuthSlice';

Entypo.loadFont();

const EditUserProfileScreen = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.authen.userInfo);
  const token = useSelector(state => state.authen.token);
  const [showGenderOption, setShowGenderOption] = useState(false);
  const [gender, setGender] = useState(userInfo.gender);
  const formRef = useRef();
  const handleUpdateUserInfo = async values => {
    const res = await fetch('http://svcy3.myclass.vn/api/Users/updateProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: userInfo.email,
        name: values.fullName,
        gender: gender,
        phone: values.phoneNumber,
      }),
    });
    const data = await res.json();
    await dispatch(fetchUserProfile());
  };

  const UserInfoSchema = Yup.object().shape({
    fullName: Yup.string().min(6, 'qua ngan'),
    phoneNumber: Yup.string().length(10, 'Not Enough!'),
  });

  return (
    <View style={styles.screen}>
      <Header
        title="My Account"
        rightIcon="save"
        onPressRight={() => formRef.current.handleSubmit()}
        leftIcon="chevron-left"
        onPressLeft={() =>
          NavigationService.navigate(Routes.USER_PROFILE_SCREEN)
        }
      />
      <ScrollView style={styles.infoContainer}>
        <Formik
          innerRef={formRef}
          initialValues={{fullName: '', phoneNumber: ''}}
          onSubmit={values => handleUpdateUserInfo(values)}
          validationSchema={UserInfoSchema}>
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <Input
                label="Full Name"
                placeholder={userInfo.name}
                inputValue={values.fullName}
                textChangeHandler={handleChange('fullName')}
                textBlurHandler={handleBlur('fullName')}
                error={errors.fullName}
                touched={touched.fullName}
              />
              <Input
                label="Phone number"
                placeholder={userInfo.phone}
                inputValue={values.phoneNumber}
                textChangeHandler={handleChange('phoneNumber')}
                textBlurHandler={handleBlur('phoneNumber')}
                error={errors.phoneNumber}
                touched={touched.phoneNumber}
              />
            </View>
          )}
        </Formik>
        <View style={styles.genderContainer}>
          <Text style={styles.genderLabel}>Gender</Text>
          <TouchableOpacity
            style={styles.genderWrapper}
            onPress={() => setShowGenderOption(!showGenderOption)}>
            <Text>{gender ? 'Male' : 'Female'}</Text>
            <Entypo name="chevron-down" size={24} />
          </TouchableOpacity>
          {showGenderOption && (
            <View style={styles.optionContainer}>
              <TouchableOpacity
                style={{
                  ...styles.optionWrapper,
                  borderBottomWidth: 1,
                  borderColor: Color.gray,
                }}
                onPress={() => {
                  setGender(true);
                  setShowGenderOption(false);
                }}>
                <Text>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionWrapper}
                onPress={() => {
                  setGender(false);
                  setShowGenderOption(false);
                }}>
                <Text>Female</Text>
              </TouchableOpacity>
            </View>
          )}
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
  infoContainer: {
    flex: 1,
    marginHorizontal: 12,
    marginTop: 12,
  },
  genderContainer: {
    width: '100%',
    marginBottom: 8,
  },
  genderLabel: {
    marginVertical: 8,
    fontSize: 14,
    color: Color.textLight,
    fontFamily: 'Manrope-Regular',
  },
  genderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Color.gray,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  optionContainer: {
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: Color.white,
  },
  optionWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
});

export default EditUserProfileScreen;
