import { createSlice } from '@reduxjs/toolkit';

const initialState={
    catSubcatRelation: {}
}

export const productSlice = createSlice({
    name: "catSubcat",
    initialState,
    reducers: {
        setCatSubcatRelation: (state, action) => {
            state.catSubcatRelation = action.payload.val
        },
    }
})


export const { setCatSubcatRelation } = productSlice.actions;
export const productReducer = productSlice.reducer