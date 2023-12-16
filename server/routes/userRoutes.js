const express = require('express');
const router = express('router');

const {authenticateUser}=require('../middleware/authentication')
const {getUserInfo,signMeOut,updateAddress,addToCart,updateCart,removeFromCart,getCartItems,updateWishlist,moveToWishlist,getWishlistItems,getOrders,createCheckoutSession,getCheckoutSession}=require('./../controllers/userController')

router.use(authenticateUser)

//User Routes
router.get('/getUserInfo', getUserInfo);
router.get('/signmeout', signMeOut)
router.post('/updateaddress', updateAddress)


//Cart Routes
router.post('/addtocart', addToCart)
router.post('/updatecart', updateCart)
router.post('/removefromcart', removeFromCart);
//NOT_IN_USE (as cartproducts are populated while user authentication)
router.get('/getcartitems', getCartItems)


//Wishlist Routes
//adding and removing from wishlist
router.post('/updatewishlist', updateWishlist)
//remove from cart and add to wishlist
router.post('/movetowishlist', moveToWishlist);
router.post('/getwishlistitems', getWishlistItems)


//Order Route
router.get('/getorders', getOrders)


//Checkout Routes
router.post('/create-checkout-session', createCheckoutSession);
router.get('/getcheckoutsession', getCheckoutSession)

module.exports=router