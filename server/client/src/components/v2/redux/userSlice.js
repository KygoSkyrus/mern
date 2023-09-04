import { createSlice } from '@reduxjs/toolkit';

const initialState={
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
    isUserLoggedIn: false,//this will be set true on ever rerender when the front component will check if user is loggedin,,on signin and on signup
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        isUserLoggedIn: (state, action) => {
            state.isUserLoggedIn = action.payload.value
        },
        setUserDetails: (state, action) => {
            if(!action.payload.user){
                state.user=initialState.user;      
                return       
            }
            state.user = action.payload.user
        },
        manageQuantity:(state,action)=>{
            state.user.cart.map(x=>{
                if(x.productId===action.payload.id){
                    x.quantity=action.payload.quantity
                }

            })
        }
    }
})


export const { isUserLoggedIn, setUserDetails,manageQuantity } = userSlice.actions;
export const userReducer = userSlice.reducer