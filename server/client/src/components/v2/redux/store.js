import { configureStore } from '@reduxjs/toolkit';
import {productFormVisibilityReducer,productFormReducer} from './todoSlice';
//import {productFormReducer} from './todoSlice';

const store = configureStore({
    reducer: {
      productFormVisibility: productFormVisibilityReducer,
      productForm:productFormReducer,
    }
})
export default store; 