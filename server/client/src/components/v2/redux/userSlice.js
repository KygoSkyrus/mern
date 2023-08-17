import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: {
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
        isUserLoggedIn: false,
    },
    reducers: {
        isUserLoggedIn: (state, action) => {
            state.isUserLoggedIn = action.payload.value
        },
        setUserDetails: (state, action) => {
            state.user = action.payload.user
        }
    }
})


export const { isUserLoggedIn, setUserDetails } = userSlice.actions;
export const userReducer = userSlice.reducer