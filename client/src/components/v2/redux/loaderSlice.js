import { createSlice } from '@reduxjs/toolkit';

export const loaderSlice = createSlice({
	name: 'loader',
	initialState: {
		loader: false,
	},
	reducers: {
		setLoaderVisibility: (state, action) => {
			state.loader = action.payload.loader
		},
	},
});
export const { setLoaderVisibility } = loaderSlice.actions;
export const loaderReducer = loaderSlice.reducer;
