const express = require('express');
const router = express('router');

const { getProducts, getProdByCategory, getProdById, getCategory, searchProd } = require('./../controllers/publicController')


router.get('/getproducts', getProducts)

router.get('/getprodbycategory', getProdByCategory)

router.get('/getprodbyid', getProdById)

router.get('/getcategory', getCategory)

router.post("/searchprod", searchProd);


module.exports = router;