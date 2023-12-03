import { createSlice } from '@reduxjs/toolkit';

const initialState={
    catSubcatRelation: {},
    isProductUpdated: false,
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
		}
    }
})


// export const isProductUpdatedSlice = createSlice({
// 	name: "isUpdated",
// 	initialState: {
// 		product: false,
// 	},
// 	reducers: {
// 		isProductUpdated: (state, action) => {
// 			state.product = action.payload.updateProduct
// 		}
// 	}
// })
// export const { isProductUpdated } = isProductUpdatedSlice.actions;



export const { setCatSubcatRelation ,isProductUpdated} = productSlice.actions;
export const productReducer = productSlice.reducer