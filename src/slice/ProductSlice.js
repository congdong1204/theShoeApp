import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  allProducts: [],
  categories: [],
  productsByCategory: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.productsByCategory = action.payload;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
      });
  },
});

export const fetchAllProducts = createAsyncThunk(
  'products/fetchProduct',
  async () => {
    const resp = await fetch('http://svcy3.myclass.vn/api/Product');
    const json = await resp.json();
    return json.content;
  },
);

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const resp = await fetch(
      'http://svcy3.myclass.vn/api/Product/getAllCategory',
    );
    const json = await resp.json();
    return json.content;
  },
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductByCategory',
  async category => {
    const resp = await fetch(
      `http://svcy3.myclass.vn/api/Product/getProductByCategory?categoryId=${category}`,
    );
    const json = await resp.json();
    return json.content;
  },
);

export default productSlice;
