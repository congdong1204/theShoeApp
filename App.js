import React from 'react';
import {View, Text} from 'react-native';
import store from './src/store';
import {Provider} from 'react-redux';
import RootNavigation from './src/navigation/AppNavigation';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;
