import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  allProducts: [],
  categories: [],
  productsByCategory: [],
  favoriteProducts: [],
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
      })
      .addCase(fetchFavoriteProducts.fulfilled, (state, action) => {
        state.favoriteProducts = action.payload;
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

export const fetchFavoriteProducts = createAsyncThunk(
  'favoriteProducts/fetchFavoriteProducts',
  async (arg, {getState}) => {
    const resp = await fetch(
      'http://svcy3.myclass.vn/api/Users/getproductfavorite',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getState().authen.token}`,
        },
      },
    );
    const data = await resp.json();
    return data.content.productsFavorite;
  },
);

export default productSlice;
