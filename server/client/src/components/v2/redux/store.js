import { configureStore } from '@reduxjs/toolkit';

import { productFormReducer } from './productFormSlice';
import { productReducer } from './productSlice';
import { userReducer } from './userSlice';
import { toastReducer } from './toastSlice';
import { loaderReducer } from './loaderSlice';

const store = configureStore({
  reducer: {
    productForm: productFormReducer,
    product: productReducer,
    user: userReducer,
    loader:loaderReducer,
    toast: toastReducer,
  }
})
export default store; 