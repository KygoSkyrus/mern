const express = require('express');
const router = express('router');


//Middleware
const {authenticateUser}=require('../middleware/authentication')
const {getUserInfo,signMeOut,updateAddress,addToCart,updateCart,removeFromCart,getCartItems,updateWishlist,moveToWishlist,getWishlistItems,getOrders,createCheckoutSession,getCheckoutSession}=require('./../controllers/userController')

// require auth for all admin routes
router.use(authenticateUser)

router.get('/getUserInfo', getUserInfo);

router.get('/signmeout', signMeOut)

router.post('/updateaddress', updateAddress)


/*********************************** CART ***********************************/
router.post('/addtocart', addToCart)
router.post('/updatecart', updateCart)
router.post('/removefromcart', removeFromCart);


//NOT_IN_USE (as cartproducts are populated while user authentication)
router.get('/getcartitems', getCartItems)
/*********************************** CART ***********************************/



/*********************************** WISHLIST ***********************************/
//adding and removing from wishlist
router.post('/updatewishlist', updateWishlist)
//remove from cart and add to wishlist
router.post('/movetowishlist', moveToWishlist);
router.post('/getwishlistitems', getWishlistItems)
/*********************************** WISHLIST ***********************************/


/*********************************** ORDER ***********************************/
router.get('/getorders', getOrders)
/*********************************** ORDER ***********************************/


/*********************************** CHECKOUT  ***********************************/
//NOTE::: DONT LET USER ADD MORE THAN 50 ITEMS AS IT WOULD BREAK THE STRIPE,,metadata object can only have 50 keys(which are products in our case),show user a warning that we dont support bulk order at the moment ,out of 50, 3 keys reserved 

//card for failing : 4000 0000 0000 0119
router.post('/create-checkout-session', createCheckoutSession);

router.get('/getcheckoutsession', getCheckoutSession)
/*********************************** CHECKOUT  ***********************************/


module.exports=router