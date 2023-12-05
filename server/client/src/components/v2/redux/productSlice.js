import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    catSubcatRelation: {},
    isProductUpdated: false,
    isSearchBarHidden: false,
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
        }
    }
})


export const { setCatSubcatRelation, isProductUpdated, hideSearchBar } = productSlice.actions;
export const productReducer = productSlice.reducer