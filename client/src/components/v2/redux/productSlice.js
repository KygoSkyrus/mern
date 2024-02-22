import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    catSubcatRelation: {},
    isProductUpdated: false,
    isSearchBarHidden: false,
    productList: null,
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setCatSubcatRelation: (state, action) => {
            state.catSubcatRelation = action.payload.val
        },
        isProductUpdated: (state, action) => {
            state.isProductUpdated = action.payload.updateProduct
        },
        hideSearchBar: (state, action) => {
            state.isSearchBarHidden = action.payload.value
        },
        setProductList: (state, action) => {
            state.productList = action.payload.value
        }
    }
})


export const { setCatSubcatRelation, isProductUpdated, hideSearchBar, setProductList } = productSlice.actions;
export const productReducer = productSlice.reducer