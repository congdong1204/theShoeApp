import {configureStore} from '@reduxjs/toolkit';

import authSlice from '../slice/AuthSlice';
import productSlice from '../slice/ProductSlice';

const store = configureStore({
  reducer: {
    authen: authSlice.reducer,
    product: productSlice.reducer,
  },
});

export default store;
