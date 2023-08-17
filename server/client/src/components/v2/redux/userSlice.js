import { createSlice } from '@reduxjs/toolkit';

export const userSlice=createSlice({
	name:"user",
	initialState:{
		user:{
            firstname: '',
            lastname: '',
            avtar: '',
            email: '',
            phone: '',
            address: {
                house: '',
                street: '',
                city: '',
                pincode: '',
                state: '',
                country: '',
            },
            role: {
                enum: '',
            },
            wishlist: [],
            cart: [],
            orders: [],
        },
        isUserLoggedIn:false,
	},
	reducers:{ 
		isProductUpdated:(state,action)=>{
			state.product=action.payload.updateProduct
		}
	}
})


export const {isProductUpdated}=userSlice.actions;
export const userReducer=userSlice.reducer