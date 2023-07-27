import { createSlice } from '@reduxjs/toolkit';


//to maintian the state  of updated an editied things,, responsible for the calling the api again on updation
export const isUpdatedSlice=createSlice({
	name:"isUpdated",
	initialState:{
		product:false,
	},
	reducers:{
		isProductUpdated:(state,action)=>{
			state.product=action.payload.updateProduct
		}
	}
})
export const {isProductUpdated}=isUpdatedSlice.actions;


export const productFormVisibilitySlice = createSlice({
	name: 'productFormVisibility',//change this to visibility..will have visibilty losgic of various compo like form loader toast
	initialState: {
		visibility: false,
		title:"",
		toast:false,
		toastContent:"",

		loader:false,
	},
	reducers: {
		// addTodo: (state, action) => {
		// 	const todo = {
		// 		id: new Date(),
		// 		title: action.payload.title,
		// 		completed: false,
		// 	};
		// 	state.push(todo);
		// },
		// toggleComplete: (state, action) => {
		// 	const index = state.findIndex((todo) => todo.id === action.payload.id);
		// 	state[index].completed = action.payload.completed;
		// },
		// deleteTodo: (state, action) => {
		// 	return state.filter((todo) => todo.id !== action.payload.id);
		// },
		productFormVisibility: (state, action) => {
			// console.log('acta', action.payload.visibility)
			state.visibility = action.payload.visibility
		},
		setProductFormTitle:(state,action)=>{
			state.title=action.payload.title
		},


		toastVisibility: (state, action) => {
			state.toast = action.payload.toast
		},
		setToastContent:(state,action)=>{
			state.toastContent=action.payload.message
		},

        setLoaderVisibility:(state,action)=>{
			state.loader=action.payload.loader
		},
	},
});

//productFormVisibility
//createSlice function automatically creates actions based on our reducer names
export const { productFormVisibility, setProductFormTitle, toastVisibility, setToastContent, setLoaderVisibility } = productFormVisibilitySlice.actions;


const initialState={
	productData:{
	name: "",
	url: "",
	price: 0,
	description: "",
	category: "",
	image: null,
	stock: 0,
	visibility:null,
	}
}

//LATER SEPARATE ALL THESE SLICES INTO DIFFERENT FILES
export const productFormSlice = createSlice({
	name: 'productForm',
	initialState,
	reducers: {
		setProductForm: (state, action) => {
			// console.log('setform actuion', action.payload)
			state.productData=action.payload
		},
		clearProductForm: (state, action) => {
			//if(!action?.payload){
				state.productData=initialState.productData
			//}
			// console.log('clearform actuion1',state, action.payload)
		},
	},
});

export const { setProductForm ,getProductData, clearProductForm} = productFormSlice.actions; //these are the actions which are imported in the components




export const productFormVisibilityReducer= productFormVisibilitySlice.reducer;
export const productFormReducer= productFormSlice.reducer;
export const isUpdatedReducer=isUpdatedSlice.reducer