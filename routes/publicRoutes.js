const express = require('express');
const router = express('router');
const { getProducts, getProdByCategory, getProdById, getCategory, searchProd, getTotalDocumentsCount } = require('./../controllers/publicController')

router.get('/getproducts', getProducts)
router.get('/getprodbycategory', getProdByCategory)
router.get('/getprodbyid', getProdById)
router.get('/getcategory', getCategory)
router.post("/searchprod", searchProd);
router.get('/gettotalproductscount', getTotalDocumentsCount)
router.get('/gettotalorderscount', getTotalDocumentsCount)
router.get('/gettotaluserscount', getTotalDocumentsCount)

module.exports = router;