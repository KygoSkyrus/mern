import { createSlice } from '@reduxjs/toolkit';

export const productFormVisibilitySlice = createSlice({
	name: 'productFormVisibility',
	initialState: {
		visibility: false
	},
	reducers: {
		addTodo: (state, action) => {
			const todo = {
				id: new Date(),
				title: action.payload.title,
				completed: false,
			};
			state.push(todo);
		},
		toggleComplete: (state, action) => {
			const index = state.findIndex((todo) => todo.id === action.payload.id);
			state[index].completed = action.payload.completed;
		},
		deleteTodo: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload.id);
		},
		productFormVisibility: (state, action) => {
			console.log('acta', action.payload.visibility)
			state.visibility = action.payload.visibility
		},
	},
});

//productFormVisibility
//createSlice function automatically creates actions based on our reducer names
export const { addTodo, toggleComplete, deleteTodo, productFormVisibility } = productFormVisibilitySlice.actions;


const initialState={
	productData:{
	name: "",
	url: "",
	price: 0,
	description: "",
	category: "",
	image: null,
	stock: 0
	}
}


export const productFormSlice = createSlice({
	name: 'productForm',
	initialState,
	reducers: {
		addTodo: (state, action) => {
			const todo = {
				id: new Date(),
				title: action.payload.title,
				completed: false,
			};
			state.push(todo);
		},
		toggleComplete: (state, action) => {
			const index = state.findIndex((todo) => todo.id === action.payload.id);
			state[index].completed = action.payload.completed;
		},
		deleteTodo: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload.id);
		},
		setProductForm: (state, action) => {
			console.log('setform actuion', action.payload)
			const x= action.payload
			state.productData=x
            // return {...state.productData,x}
			//state.visibility = action.payload.visibility
		},
		getProductData:(state,action)=>{
			console.log('st',state)
		  
		},
		clearProductForm: (state, action) => {
			if(!action?.payload){
				state=initialState
			}
			console.log('clearform actuion1',state, action.payload)

			//state.visibility = action.payload.visibility
		},
	},
});

export const { setProductForm ,getProductData, clearProductForm} = productFormSlice.actions; //these are the actions which are imported in the components




export const productFormVisibilityReducer= productFormVisibilitySlice.reducer;
export const productFormReducer= productFormSlice.reducer;