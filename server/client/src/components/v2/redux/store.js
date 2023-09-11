import { configureStore } from '@reduxjs/toolkit';
import {productFormVisibilityReducer,productFormReducer, isUpdatedReducer} from './todoSlice';
import { userReducer } from './userSlice';
//import {productFormReducer} from './todoSlice';

const store = configureStore({
    reducer: {
      productFormVisibility: productFormVisibilityReducer,
      productForm:productFormReducer,
      isUpdated:isUpdatedReducer,
      user:userReducer,
    }
})
export default store; 