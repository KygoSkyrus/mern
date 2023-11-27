import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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
    let m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let d = new Date(date)
    return d.getDate() + " " + (m[d.getMonth()]) + " " + (d.getFullYear()) + ", " + (d.getHours() < 12 ? d.getHours() : d.getHours() - 12) + ":" + (d.getMinutes()) + " " + (d.getHours() < 12 ? "AM" : "PM")
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

export const updatewishlist = (productId, dispatch) => {
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



export const goWithGoogle = (val,navigate,dispatch) => {

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
                    signinAPI('signup', result.user.email, firstname, lastname, result.user.photoURL,dispatch)
                    navigate('/user');//sending user to user page for filling out other details
                } else {
                    signinAPI('signin', result.user.email,'','','',dispatch)
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

const signinAPI = (val, email, firstname, lastname, photo, dispatch) => {
  let resp;
  fetch(`/api/${val}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          firstname, lastname, email, photo
      })
  })
      .then(response => {
          resp = response;
          return response.json()
      })
      .then(res => {
          console.log("res.user", res.user)
          if (resp.status === 200) {
              dispatch(setToastStatus({ isSuccess: true }))
          } else {
              dispatch(setToastStatus({ isSuccess: false }))
          }
          document.getElementById('closeSignin').click()//closing the modal

          dispatch(toastVisibility({ toast: true }))
          dispatch(setToastContent({ message: res.message }))
          if (res.is_user_logged_in) {
              dispatch(isUserLoggedIn({ value: true }))
              dispatch(setUserDetails({ user: res.user }))
          }
      })
}