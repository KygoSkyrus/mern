import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	visibility: false,
	title: "",
	productData: {
		name: "",
		url: "",
		price: 0,
		description: "",
		category: "",
		image: null,
		stock: 0,
		discount: 0,
		visibility: null,
	}
}

export const productFormSlice = createSlice({
	name: 'productForm',
	initialState,
	reducers: {
		setProductForm: (state, action) => {
			state.productData = action.payload
		},
		clearProductForm: (state, action) => {
			state.productData = initialState.productData
		},
		setProductFormVisibility: (state, action) => {
			state.visibility = action.payload.visibility
		},
		setProductFormTitle: (state, action) => {
			state.title = action.payload.title
		},
	},
});

export const { setProductForm, clearProductForm, setProductFormVisibility, setProductFormTitle } = productFormSlice.actions;
export const productFormReducer = productFormSlice.reducer;
