import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

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
import LoadingView from '../../components/LoadingView';

const SingupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
});

MaterialCommunityIcons.loadFont();
Entypo.loadFont();

const SignUpSreen = () => {
  const dispatch = useDispatch();
  const [checkRemember, setCheckRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const handleSubmit = async values => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('http://svcy3.myclass.vn/api/Users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        const errorMessage = errorData.message;
        let message = 'Something went wrong!';
        if (errorMessage === 'Email đã được sử dụng!') {
          message = 'The email address exists already!';
        }
        throw new Error(message);
      }
      NavigationService.navigate(Routes.LOGIN_SCREEN);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView></SafeAreaView>
      <View style={styles.logoContainer}>
        <View style={styles.logoWrapper}>
          <MaterialCommunityIcons
            name="shoe-sneaker"
            size={48}
            color={Color.white}
          />
        </View>
        <Text style={styles.logoText}>ShoeApp</Text>
      </View>

      <Text style={styles.title}>Getting Started</Text>
      <Text style={styles.message}>Create an account to continue!</Text>

      <View style={styles.signinWrapper}>
        <Formik
          initialValues={{email: '', password: '', confirmPassword: ''}}
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
                placeholder="Please enter your email"
                inputValue={values.email}
                textChangeHandler={handleChange('email')}
                textBlurHandler={handleBlur('email')}
                error={errors.email}
                touched={touched.email}
                // autoCapitalize={false}
              />
              <Input
                label="Password"
                placeholder="Please enter your password"
                inputValue={values.password}
                textChangeHandler={handleChange('password')}
                textBlurHandler={handleBlur('password')}
                error={errors.password}
                touched={touched.password}
              />
              <Input
                label="Confirm Password"
                placeholder="Please enter your password"
                inputValue={values.confirmPassword}
                textChangeHandler={handleChange('confirmPassword')}
                textBlurHandler={handleBlur('confirmPassword')}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
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
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>

      <View style={styles.signupWrapper}>
        <Text style={styles.signupText}>Already have an account? </Text>
        <TouchableOpacity
          onPress={() => NavigationService.navigate(Routes.LOGIN_SCREEN)}>
          <Text style={styles.signupTextPress}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.socialLoginWrapper}>
        <TouchableOpacity style={styles.facebookWrapper}>
          <Entypo name="facebook" size={24} color={Color.white} />
          <Text style={styles.facebookText}>Continue With Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleWrapper}>
          <Image
            source={require('../../../assets/images/GoogleIcon.png')}
            style={styles.googleIcon}
          />
          <Text style={styles.googleText}>Continue With Google</Text>
        </TouchableOpacity>
      </View>

      {isLoading && <LoadingView />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.accent,
    height: 60,
    width: 60,
    borderRadius: 16,
  },
  logoText: {
    marginLeft: 16,
    color: Color.accent,
    fontSize: 32,
    fontFamily: 'Manrope-Bold',
  },
  title: {
    color: Color.black,
    fontSize: 24,
    fontFamily: 'Manrope-Bold',
    alignSelf: 'center',
    marginTop: 32,
  },
  message: {
    color: Color.textLight,
    fontSize: 16,
    fontFamily: 'Manrope-Regular',
    alignSelf: 'center',
    marginTop: 8,
  },
  signinWrapper: {
    paddingHorizontal: 24,
    marginTop: 32,
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
    backgroundColor: Color.accent,
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
  signupWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 16,
    color: Color.textDark,
    fontFamily: 'Manrope-Regular',
  },
  signupTextPress: {
    fontSize: 16,
    color: Color.accent,
    fontFamily: 'Manrope-Bold',
  },
  socialLoginWrapper: {
    marginHorizontal: 24,
    marginTop: 32,
  },
  facebookWrapper: {
    flexDirection: 'row',
    backgroundColor: Color.blue,
    paddingVertical: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  facebookText: {
    fontSize: 14,
    color: Color.white,
    fontFamily: 'Manrope-Medium',
    marginLeft: 12,
  },
  googleWrapper: {
    flexDirection: 'row',
    backgroundColor: Color.gray,
    paddingVertical: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  googleText: {
    fontSize: 14,
    color: Color.textDark,
    fontFamily: 'Manrope-Medium',
    marginLeft: 12,
  },
});

export default SignUpSreen;
