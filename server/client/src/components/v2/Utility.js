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

export default getUser;