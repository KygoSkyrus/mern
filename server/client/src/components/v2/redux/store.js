import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from './userSlice';
import { toastReducer } from './toastSlice';
import { loaderReducer } from './loaderSlice';
import { productReducer } from './productSlice';
import { productFormReducer } from './productFormSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    toast: toastReducer,
    loader:loaderReducer,
    product: productReducer,
    productForm: productFormReducer,
  }
})
export default store; 