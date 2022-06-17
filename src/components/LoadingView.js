import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';

export default LoadingView = ({indicatorColor, indicatorStyle}) => {
  return (
    <View style={styles.container}>
      <View style={styles.indicatorView}>
        <SkypeIndicator
          style={[styles.indicatorStyle, indicatorStyle]}
          color={indicatorColor || '#ffffff'}
          size={50}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  indicatorView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorStyle: {
    width: 30,
    height: 30,
  },
});
