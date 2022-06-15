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

const Header = ({
  title,
  leftIcon,
  rightIcon,
  onPressLeft,
  onPressRight,
  backgroundColor = Color.background,
  titleColor = Color.primary,
}) => {
  const [h, setH] = useState(0);
  useEffect(() => {
    const {StatusBarManager} = NativeModules;
    setH(StatusBarManager.HEIGHT);
  }, []);
  return (
    <View style={heightNavi(h).fullView}>
      {Platform.OS === 'ios' && (
        <View style={{backgroundColor: backgroundColor, height: h}} />
      )}
      <View style={{...styles.container, backgroundColor: backgroundColor}}>
        <TouchableOpacity onPress={onPressLeft}>
          <Entypo name={leftIcon} size={32} color={titleColor} />
        </TouchableOpacity>
        <View>
          <Text style={{...styles.title, color: titleColor}}>{title}</Text>
        </View>
        <TouchableOpacity onPress={onPressRight}>
          <Entypo name={rightIcon} size={24} color={titleColor} />
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
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
});

export default Header;
