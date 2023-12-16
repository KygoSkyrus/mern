import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setLoaderVisibility } from './redux/loaderSlice';
import { setUserDetails, isUserLoggedIn, setAdminAuthStatus } from './redux/userSlice';
import { invokeToast } from "./redux/toastSlice";

export function getUser(dispatch) {
    //this function should be called in splashScreen component
    let resp;
    fetch('/api/user/getUserInfo',)
        .then(response => {
            resp = response
            return response.json()
        })
        .then(res => {
            dispatch(isUserLoggedIn({ value: res.is_user_logged_in }))
            if (res.is_user_logged_in && resp.status === 200) {
                dispatch(setUserDetails({ user: res.user }))
            } else {
                dispatch(invokeToast({ isSuccess: false, message: res.message }))
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

export function getDateStr(date) {
    let d = new Date(date)
    return d.getDate() + "-" + (d.getMonth() + 1) + "-" + (d.getFullYear())
}
export function getFullDateStr(date) {
    let m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let d = new Date(date)
    return d.getDate() + " " + (m[d.getMonth()]) + " " + (d.getFullYear()) + ", " + (d.getHours() < 12 ? d.getHours() : d.getHours() - 12) + ":" + (d.getMinutes()) + " " + (d.getHours() < 12 ? "AM" : "PM")
}

export function inProgressLoader(dispatch, val) {
    dispatch(setLoaderVisibility({ loader: val }))
    handleOverflow(val)
}

export function handleOverflow(val) {
    const root = document.getElementById('root')
    val ? root.classList.add('overflowHidden') : root.classList.remove('overflowHidden')
}

const addToCartAPI = async (productId, dispatch) => {
    apiCall(dispatch, '/api/user/addtocart', { productId })
}

// Debounce function to delay API calls by a specified time
export function debounce(func, wait) {
    let timeoutId;
    return function (...args) {
        const context = this;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(context, args), wait);
    };
}

export const debouncedApi = debounce(addToCartAPI, 500);

export function apiCall(dispatch, apiUrl, body) {
    let resp;
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    })
        .then(response => {
            resp = response;
            return response.json()
        })
        .then(res => {
            inProgressLoader(dispatch, false)
            if (resp.status === 200) {
                dispatch(invokeToast({ isSuccess: true, message: res.message }))
                dispatch(setUserDetails({ user: res.user }))
            } else {
                dispatch(invokeToast({ isSuccess: false, message: res.message }))
            }
        })
}

export const updatewishlist = (productId, dispatch) => {
    inProgressLoader(dispatch, true)
    apiCall(dispatch, '/api/user/updatewishlist', { productId })
}

export const goWithGoogle = (val, navigate, dispatch, route, isAdminLogin) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;// a Google Access Token. can be used to access the Google API.
            if (token) {
                let dname = result.user.displayName.split(" ")
                let lastname = ''
                let firstname = dname[0]
                if (dname.length > 1) {
                    lastname = dname[dname.length - 1]
                }

                if (val === 'signup') {
                    signinAPI('signup', result.user.email, firstname, lastname, result.user.photoURL, dispatch)
                    navigate('/user');//sending user to user page for filling out other details
                } else {
                    signinAPI('signin', result.user.email, '', '', '', dispatch, navigate, route, isAdminLogin)
                }
            }
        })
        .catch((error) => {
            dispatch(invokeToast({ isSuccess: false, message: "Google login failed, Try Again with valid google account" }))
        });

}

export const signinAPI = (val, email, firstname, lastname, photo, dispatch, navigate, route, isAdminLogin = false) => {

    let resp;
    fetch(`/api/${val}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstname, lastname, email, photo, isAdminLogin
        })
    })
        .then(response => {
            resp = response;
            return response.json()
        })
        .then(res => {
            document.getElementById('closeSignin').click()//closing the modal
            if (resp.status === 200) {
                dispatch(invokeToast({ isSuccess: true, message: res.message }))
            } else {
                dispatch(invokeToast({ isSuccess: false, message: res.message }))
            }

            if (res.is_user_logged_in) {
                dispatch(isUserLoggedIn({ value: true }))
                dispatch(setUserDetails({ user: res.user }))
            }

            if (isAdminLogin && res.is_user_logged_in) {
                dispatch(setAdminAuthStatus({ value: res.is_user_logged_in }))
                navigate(`/admin/${route}`)//navigates to requested route
            } 
        })
}

export function signOut(dispatch) {
    inProgressLoader(dispatch, true)
    let resp;
    fetch('/api/user/signmeout')
        .then(response => {
            resp = response;
            return response.json()
        })
        .then(res => {
            inProgressLoader(dispatch, false)
            if (resp.status === 200) {
                dispatch(setAdminAuthStatus({ value: false }))//for admin
                dispatch(isUserLoggedIn({ value: false }))
                dispatch(setUserDetails({ user: undefined }))//clearing user details
                dispatch(invokeToast({ isSuccess: true, message: res.message }))
            } else {
                dispatch(invokeToast({ isSuccess: false, message: res.message }))
            }
        })
}

export function findSubString(str, subStr) {
    return str?.toLowerCase()?.includes(subStr?.toLowerCase());
}

export function getAvatarUrl(i) {
    return `https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/avatar%2Favatar%20(${i}).png?alt=media&token=4c4b0ea3-519f-430c-9f0f-8c24df8d163c`
}

//CONSTS
export const categoryArray = ["Home Appliances", "Video Game Accessories", "Wearable Devices", "Speakers", "Computer Accessories", "Storage Devices"]
export const topPicksArray = ["laptops", "smartphones", "fitness trackers", "graphics cards", "playstation"]
export const socialArray = ["fa-github", "fa-linkedin-in", "fa-twitter", "fa-instagram", "fa-facebook"]
export const defaultAvatar = 'https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/avatar%2FuserAvatar%20(6).png?alt=media&token=8fb50e10-daf9-402a-b020-65495494e14a'