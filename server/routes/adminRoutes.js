const express = require('express');
const router = express('router');


//Middleware
const {authenticateAdmin}=require('../middleware/authentication')

const {authentication,getOrders,getUsers,deleteUser,setProductVisibility,addProduct,editProduct,addCategory,deleteProduct}=require('./../controllers/adminController')

// require auth for all admin routes
router.use(authenticateAdmin);

router.get('/authentication', authentication)

router.get('/getorders', getOrders)

//admin rights only
router.get('/getusers', getUsers)

router.get('/deleteuser', deleteUser)


//setting blogs visibility
router.post("/productvisibility", setProductVisibility);

//this one should has authenitcate user mididleware for admin only
router.post('/addproduct', addProduct)

router.post('/editproduct', editProduct)

router.post('/addcategory', addCategory)

router.get('/deleteproduct', deleteProduct)


module.exports= router