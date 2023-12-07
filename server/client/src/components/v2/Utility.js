import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setUserDetails, isUserLoggedIn, setAdminAuthStatus } from './redux/userSlice';
import { setLoaderVisibility } from './redux/loaderSlice';
import { toastVisibility, setToastContent, setToastStatus, invokeToast } from "./redux/toastSlice";

const getUser = (dispatch) => {

    let resp;
    fetch('/api/getUserInfo',)
        .then(response => {
            resp = response
            return response.json()
        })
        .then(res => {
            console.log('userindo', res, resp.status)

            dispatch(isUserLoggedIn({ value: res.is_user_logged_in }))
            if (res.is_user_logged_in && resp.status === 200) {
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
    let m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let d = new Date(date)
    return d.getDate() + " " + (m[d.getMonth()]) + " " + (d.getFullYear()) + ", " + (d.getHours() < 12 ? d.getHours() : d.getHours() - 12) + ":" + (d.getMinutes()) + " " + (d.getHours() < 12 ? "AM" : "PM")
}

export function inProgressLoader(dispatch, val) {
    dispatch(setLoaderVisibility({ loader: val }))
    handleOverflow(val)
}

export function handleOverflow(val) {
    console.log('handoverflow')
    const root = document.getElementById('root')
    val ? root.classList.add('overflowHidden') : root.classList.remove('overflowHidden')
}

const addToCartAPI = async (productId, dispatch) => {
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
            inProgressLoader(dispatch, false)
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

export const debouncedApi = debounce(addToCartAPI, 500);

export const updatewishlist = (productId, dispatch) => {
    inProgressLoader(dispatch, true)
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
            inProgressLoader(dispatch, false)
            if (resp.status === 200) {
                dispatch(invokeToast({ isSuccess: true, message: res.message }))
                dispatch(setUserDetails({ user: res.user }))
            } else {
                dispatch(invokeToast({ isSuccess: false, message: res.message }))
            }
            console.log('response add wishlist', res)
        })
}



export const goWithGoogle = (val, navigate, dispatch, route, isAdminLogin) => {
    console.log('isal', isAdminLogin)
    //with this the two things that google does for us is that it authentiicates the email id and make sure that no on uses soeonelse's id ,on signup you will have to chekc is the account already exist,,if dont only then create the account ,,,,on signin you have to check the same if the user even exist and if it does exist then resturn response that user exist and set the jwt
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log(result)
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            //console.log(token, result.user);// The signed-in user info.

            //after google authentication
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
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(
                "errorCode:",
                errorCode,
                ",",
                "errorMessage: ",
                errorMessage,
                ",",
                "email: ",
                email,
                ",",
                "credential:",
                credential
            );
        });

}

export const signinAPI = (val, email, firstname, lastname, photo, dispatch, navigate, route, isAdminLogin = false) => {
    console.log('rrr', route)

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
            console.log("res.user", res.user)

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
                // console.log('navigate -1')
                    dispatch(setAdminAuthStatus({ value: res.is_user_logged_in }))
                    navigate(`/admin/${route}`)//navigating to requested route
            } else {
                document.getElementById('closeSignin').click()//closing the modal
            }
        })
}

export function findSubString(str, subStr) {
    return str?.toLowerCase()?.includes(subStr?.toLowerCase());
}


export const categoryArray = ["Home Appliances", "Video Game Accessories", "Wearable Devices", "Speakers", "Computer Accessories", "Storage Devices"]
export const topPicksArray = ["laptops", "smartphones", "fitness trackers", "graphics cards", "playstation"]
export const socialArray = ["fa-github", "fa-linkedin-in", "fa-twitter", "fa-instagram", "fa-facebook"]
