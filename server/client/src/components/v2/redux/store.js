import { configureStore } from '@reduxjs/toolkit';
import {productFormVisibilityReducer,productFormReducer, isUpdatedReducer} from './todoSlice';
//import {productFormReducer} from './todoSlice';

const store = configureStore({
    reducer: {
      productFormVisibility: productFormVisibilityReducer,
      productForm:productFormReducer,
      isUpdated:isUpdatedReducer,
    }
})
export default store; 