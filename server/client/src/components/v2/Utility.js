import { setUserDetails, isUserLoggedIn } from './redux/userSlice';
import { toastVisibility, setToastContent, setToastStatus } from './redux/todoSlice';

const getUser = (dispatch) => {


    let resp;
    fetch('/api/getUserInfo',)
        .then(response => {
            resp = response
            return response.json()
        })
        .then(res => {
            console.log('userindo', res, resp.status)

            if (res.is_user_logged_in && resp.status === 200) {
                dispatch(isUserLoggedIn({ value: true }))
                dispatch(setUserDetails({ user: res.user }))
            } else {
                //to show only session expired notification, bcz this api calls on ever reload due to which the access gratend notification will popup everytime
                dispatch(setToastStatus({ isSuccess: false }))
                dispatch(toastVisibility({ toast: true }))
                dispatch(setToastContent({ message: res.message }))
            }

        })

}
export default getUser;


export const formatInINR = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
})

export const formatInINRwoSign = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
})

export function getDateStr(date) {
    let d = new Date(date)
    return d.getDate() + "-" + (d.getMonth() + 1) + "-" + (d.getFullYear())
}


export function getFullDateStr(date) {
    let m=['January','February','March','April','May','June','July','August','September','October','November','December']
    let d = new Date(date)
    return d.getDate() + " " + (m[d.getMonth()]) + " " + (d.getFullYear()) + ", " + (d.getHours() < 12 ? d.getHours() : d.getHours() - 12) + ":" + (d.getMinutes()) + " " + (d.getHours() < 12 ? "AM" : "PM")
  }


  const addToCartAPI = async (productId,dispatch) => {
    let resp;
    fetch(`/api/addtocart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            productId
        }),
    })
        .then(response => {
            resp = response
            return response.json()
        })
        .then(res => {
            console.log('res add to cart', res)
            if (resp.status === 200) {
                dispatch(setToastStatus({ isSuccess: true }))
                dispatch(setUserDetails({ user: res.user }))
            } else {
                dispatch(setToastStatus({ isSuccess: false }))
            }
            dispatch(toastVisibility({ toast: true }))
            dispatch(setToastContent({ message: res.message }))
            console.log('response add tocart', res)
        })
}

    // Debounce function to delay API calls by a specified time
    function debounce(func, wait) {
        let timeoutId;
        return function (...args) {
            const context = this;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(context, args), wait);
        };
    }

    export const debouncedApi = debounce(addToCartAPI, 2000);

    export const updatewishlist = (productId,dispatch) => {
        let resp;
        fetch(`/api/updatewishlist`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId
            }),
        })
            .then(response => {
                resp = response
                return response.json()
            })
            .then(res => {
                console.log('res add to wishlist', res)
                if (resp.status === 200) {
                    dispatch(setToastStatus({ isSuccess: true }))
                    dispatch(setUserDetails({ user: res.user }))
                } else {
                    dispatch(setToastStatus({ isSuccess: false }))
                }
                dispatch(toastVisibility({ toast: true }))
                dispatch(setToastContent({ message: res.message }))
                console.log('response add wishlist', res)
            })
    }
