const express = require('express');
const router = express('router');
const { authenticateAdmin } = require('../middleware/authentication')
const { authentication, getOrders, getUsers, setProductVisibility, addProduct, editProduct, addCategory, deleteProduct } = require('./../controllers/adminController')

// require auth for all admin routes
router.use(authenticateAdmin);

router.get('/authentication', authentication)
router.get('/getorders', getOrders)
router.get('/getusers', getUsers)
router.post("/productvisibility", setProductVisibility);
router.post('/addproduct', addProduct)
router.post('/editproduct', editProduct)
router.post('/addcategory', addCategory)//not-in-use
router.post('/deleteproduct', deleteProduct)

module.exports = router