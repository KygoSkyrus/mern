//Schema
const PRODUCT = require('../models/product')
const CATEGORY = require('../models/category')

const getProducts= async (req, res) => {

    const { limit } = req.query
    await PRODUCT.find({}).limit(limit)
        .then(response => {
            res.send(response)
        })
        .catch(error => {
            console.log(error)
            res.send({ error: error })
        })
}

const getProdByCategory= async (req, res) => {

    const { category } = req.query
    // console.log('categoryID', category)

    PRODUCT.find({ category: category })
        .then(response => {
            response=response.filter(x=>x.visibility)
            res.send({ products: response })
        })
        .catch(err => {
            console.log(err)
        })

}

const getProdById= async (req, res) => {

    const { prodId } = req.query

    PRODUCT.find({ _id: prodId })
        .then(response => {
            response=response.filter(x=>x.visibility)
            res.send({ product: response })
        })
        .catch(err => {
            console.log(err)
        })

}

const getCategory= async (req, res) => {

    await CATEGORY.find({})
        .then(response => {
            res.send(response)
        })
        .catch(error => {
            console.log(error)
            res.send({ error: error })
        })

}

const searchProd=async (req, res) => {
    const { value } = req.body;

    try {
        if (value === "") {
            res.send([]);
        } else {
            let result = await PRODUCT.find({ "name": { "$regex": value, "$options": "i" } })
            res.send(result);
        }
    } catch (err) {
        console.log(err);
    }
}


module.exports={getProducts,getProdByCategory,getProdById,getCategory,searchProd}