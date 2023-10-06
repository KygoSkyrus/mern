import { configureStore } from '@reduxjs/toolkit';

import {productFormVisibilityReducer,productFormReducer, isUpdatedReducer} from './todoSlice';
import { userReducer } from './userSlice';
import { productReducer } from './productSlice';

const store = configureStore({
    reducer: {
      productFormVisibility: productFormVisibilityReducer,
      productForm:productFormReducer,
      isUpdated:isUpdatedReducer,
      user:userReducer,
      product:productReducer
    }
})
export default store; 