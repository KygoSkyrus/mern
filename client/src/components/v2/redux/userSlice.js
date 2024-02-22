/* eslint-disable array-callback-return */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
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
    isUserLoggedIn: null,//this will be set true on every re-render when the front component will check if user is logged in; also on signin and on signup
    isAdminAuthSuccess: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        isUserLoggedIn: (state, action) => {
            state.isUserLoggedIn = action.payload.value
        },
        setUserDetails: (state, action) => {
            if (!action.payload.user) {
                state.user = initialState.user;
                return
            }
            state.user = action.payload.user
        },
        manageQuantity: (state, action) => {
            state.user.cart.map(x => {
                if (x.productId === action.payload.id) {
                    x.quantity = action.payload.quantity
                }
            })
        },
        setAdminAuthStatus: (state, action) => {
            state.isAdminAuthSuccess = action.payload.value
        }
    }
})


export const { isUserLoggedIn, setUserDetails, manageQuantity, setAdminAuthStatus } = userSlice.actions;
export const userReducer = userSlice.reducer