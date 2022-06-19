import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import Color from '../constants/Color';

Entypo.loadFont();
const Checkbox = ({checked = false, checkHandle}) => {
  return (
    <TouchableOpacity
      onPress={checkHandle}
      style={checked ? styles.checkWrapperChecked : styles.checkWrapper}>
      {checked && <Entypo name="check" size={16} color={Color.white} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkWrapper: {
    borderWidth: 1,
    borderColor: Color.accent,
    width: 18,
    height: 18,
    borderRadius: 4,
  },
  checkWrapperChecked: {
    borderWidth: 1,
    borderColor: Color.accent,
    width: 18,
    height: 18,
    borderRadius: 4,
    backgroundColor: Color.accent,
  },
});

export default Checkbox;
