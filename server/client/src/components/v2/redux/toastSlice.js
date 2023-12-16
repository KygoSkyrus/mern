import { createSlice } from '@reduxjs/toolkit';

export const toastSlice = createSlice({
	name: 'toast',
	initialState: {
		toast: false,
		toastContent: "",
		isSuccess: false,
	},
	reducers: {
		toastVisibility: (state, action) => {
			state.toast = action.payload.toast
		},
		setToastContent: (state, action) => {
			state.toastContent = action.payload.message
		},
		setToastStatus: (state, action) => {
			state.isSuccess = action.payload.isSuccess
		},
		invokeToast: (state, action) => {
			state.toast = true
			state.isSuccess = action.payload.isSuccess
			state.toastContent = action.payload.message
		}
	},
});

export const { toastVisibility, setToastContent, setToastStatus, invokeToast } = toastSlice.actions;
export const toastReducer = toastSlice.reducer;
