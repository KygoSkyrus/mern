import { createSlice } from '@reduxjs/toolkit';


//to maintian the state  of updated an editied things,, responsible for the calling the api again on updation

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

//LATER SEPARATE ALL THESE SLICES INTO DIFFERENT FILES
export const productFormSlice = createSlice({
	name: 'productForm',
	initialState,
	reducers: {
		setProductForm: (state, action) => {
			// console.log('setform actuion', action.payload)
			state.productData = action.payload
		},
		clearProductForm: (state, action) => {
			//if(!action?.payload){
			state.productData = initialState.productData
			//}
			// console.log('clearform actuion1',state, action.payload)
		},
		setProductFormVisibility: (state, action) => {
			// console.log('acta', action.payload.visibility)
			state.visibility = action.payload.visibility
		},
		setProductFormTitle: (state, action) => {
			state.title = action.payload.title
		},
	},
});

export const { setProductForm, clearProductForm, setProductFormVisibility, setProductFormTitle } = productFormSlice.actions; //these are the actions which are imported in the components


export const productFormReducer = productFormSlice.reducer;
