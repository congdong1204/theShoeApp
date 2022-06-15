import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';

import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';
import Color from '../../constants/Color';
import {fetchLogin, fetchUserProfile} from '../../slice/AuthSlice';
import {
  fetchCategories,
  fetchAllProducts,
  fetchFavoriteProducts,
} from '../../slice/ProductSlice';
import NavigationService from '../../navigation';
import Routes from '../../navigation/Routes';

const SingupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [checkRemember, setCheckRemember] = useState(false);
  const [error, setError] = useState();

  const handleSubmit = async values => {
    try {
      await dispatch(fetchLogin(values));
      await dispatch(fetchUserProfile());
      await dispatch(fetchCategories());
      await dispatch(fetchAllProducts());
      await dispatch(fetchFavoriteProducts());
      NavigationService.navigate(Routes.DRAWER_MENU);
    } catch (err) {
      console.log('pham cong dong');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upWrapper}></View>
      <View style={styles.middleWrapper}>
        <View style={styles.signinWrapper}>
          <Text style={styles.titile}>Welcome</Text>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={SingupSchema}
            onSubmit={values => handleSubmit(values)}>
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              values,
              errors,
              touched,
            }) => (
              <View>
                <Input
                  label="Email"
                  inputValue={values.email}
                  textChangeHandler={handleChange('email')}
                  textBlurHandler={handleBlur('email')}
                  error={errors.email}
                  touched={touched.email}
                />
                <Input
                  label="Password"
                  inputValue={values.password}
                  textChangeHandler={handleChange('password')}
                  textBlurHandler={handleBlur('password')}
                  error={errors.password}
                  touched={touched.password}
                />
                <View style={styles.rememberUserWrapper}>
                  <Checkbox
                    checked={checkRemember}
                    checkHandle={() => setCheckRemember(!checkRemember)}
                  />
                  <Text style={styles.rememberUserText}>Remember me</Text>
                </View>
                <TouchableOpacity
                  style={styles.buttonWrapper}
                  onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </View>
      <View style={styles.downWrapper}>
        <Text style={{color: Color.textWhite}}>Don’t have an account?</Text>
        <Text style={{color: Color.red}}>Sign up</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
  upWrapper: {
    flex: 2,
    backgroundColor: Color.primary,
    borderBottomLeftRadius: 80,
  },
  middleWrapper: {
    flex: 6,
    backgroundColor: Color.primary,
  },
  signinWrapper: {
    flex: 1,
    backgroundColor: Color.background,
    borderTopRightRadius: 80,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    paddingHorizontal: 24,
  },
  titile: {
    color: Color.primary,
    fontSize: 28,
    fontFamily: 'Manrope-Bold',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  rememberUserWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rememberUserText: {
    fontSize: 14,
    color: Color.textLight,
    fontFamily: 'Manrope-Regular',
    marginLeft: 12,
  },
  buttonWrapper: {
    backgroundColor: Color.primary,
    paddingVertical: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  buttonText: {
    color: Color.textWhite,
    fontSize: 16,
    fontFamily: 'Manrope-Bold',
  },
  downWrapper: {
    flex: 2,
    backgroundColor: Color.primary,
  },
});

export default LoginScreen;

// const apiSignin = () => {
//   const body = {
//     email: 'congdong@gmail.com',
//     password: 'congdong123',
//   };
//   axios({
//     method: 'post',
//     url: 'http://svcy3.myclass.vn/api/Users/signin',
//     headers: {
//       Accept: '*/*',
//       'Content-Type': 'application/json',
//     },
//     data: body,
//   })
//     .then(response => {
//       console.log('data: ', response.data);
//     })
//     .catch(error => {
//       console.error('There was an error!', error);
//     });
// };
