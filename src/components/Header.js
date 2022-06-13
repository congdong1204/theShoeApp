import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Color from '../constants/Color';

Entypo.loadFont();
const heightNavi = h =>
  StyleSheet.create({
    fullView: {
      width: '100%',
      height: 60 + h,
    },
  });

const Header = ({title, leftIcon, rightIcon, onPressLeft, onPressRight}) => {
  const [h, setH] = useState(0);
  useEffect(() => {
    const {StatusBarManager} = NativeModules;
    setH(StatusBarManager.HEIGHT);
  }, []);
  return (
    <View style={heightNavi(h).fullView}>
      {Platform.OS === 'ios' && (
        <View style={{backgroundColor: Color.background, height: h}} />
      )}
      <View style={styles.container}>
        <TouchableOpacity onPress={onPressLeft}>
          <Entypo name={leftIcon} size={32} color={Color.primary} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity onPress={onPressRight}>
          <Entypo name={rightIcon} size={32} color={Color.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    width: '100%',
    backgroundColor: Color.background,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    color: Color.primary,
    fontWeight: '700',
  },
});

export default Header;
