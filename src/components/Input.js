import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Color from '../constants/Color';

const Input = ({
  label,
  inputValue,
  textChangeHandler,
  textBlurHandler,
  error,
  touched,
  ...restProps
}) => {
  return (
    <View style={styles.formControl}>
      <View style={styles.labelWrapper}>
        <Text style={styles.label}>{label}</Text>
        {error && touched && <Text style={styles.errorText}>{error}</Text>}
      </View>
      <TextInput
        {...restProps}
        style={error && touched ? styles.inputError : styles.input}
        value={inputValue}
        onChangeText={textChangeHandler}
        onBlur={textBlurHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
    marginBottom: 8,
  },
  labelWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    marginVertical: 8,
    fontSize: 14,
    color: Color.textLight,
    fontFamily: 'Manrope-Regular',
  },
  input: {
    backgroundColor: Color.gray,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 20,
    fontSize: 14,
    color: Color.textDark,
  },
  inputError: {
    backgroundColor: Color.gray,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 20,
    fontSize: 14,
    color: Color.textDark,
    borderWidth: 1,
    borderColor: Color.red,
  },
  errorText: {
    color: Color.red,
    marginVertical: 8,
    fontSize: 14,
    fontFamily: 'Manrope-Regular',
  },
});

export default Input;
