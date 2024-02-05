const express = require('express');
const router = express('router');
const { authenticateAdmin, checkAcessRights } = require('../middleware/authentication')
const { authentication, getOrders, getUsers, setProductVisibility, addProduct, editProduct, addCategory, deleteProduct } = require('./../controllers/adminController');
const { signMeOut } = require('../controllers/publicController');

// require auth for all admin routes
router.use(authenticateAdmin);
router.use(checkAcessRights);

router.get('/authentication', authentication)
router.get('/getorders', getOrders)
router.get('/getusers', getUsers)
router.get('/signmeout', signMeOut)
router.post('/productvisibility', setProductVisibility);
router.post('/addproduct', addProduct)
router.post('/editproduct', editProduct)
router.post('/addcategory', addCategory)//not-in-use
router.post('/deleteproduct', deleteProduct)


module.exports = router