import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
	name: 'todos',
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
		productFormVisibility: (state,action) => {
			console.log('acta',action.payload.visibility)
		    state.visibility=action.payload.visibility
		},

	},
});

//createSlice function automatically creates actions based on our reducer names

export const { addTodo, toggleComplete, deleteTodo, productFormVisibility } = todoSlice.actions;

export default todoSlice.reducer;