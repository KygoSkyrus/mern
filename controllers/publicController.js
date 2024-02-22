const jwt = require('jsonwebtoken');
const PRODUCT = require('../models/product')
const CATEGORY = require('../models/category');
const USER = require('../models/user');
const ORDER = require('../models/orders');

const getProducts = async (req, res) => {
    const { limit, page } = req.query;
    await PRODUCT.find({})
        .skip((page - 1) * limit)
        .limit(limit)
        .then(response => {
            res.send(response)
        })
        .catch(error => {
            console.log(error)
            res.send({ error: error })
        })
}

const getProdByCategory = async (req, res) => {

    const { category } = req.query
    PRODUCT.find({ category: category })
        .then(response => {
            response = response.filter(x => x.visibility)
            res.send({ products: response })
        })
        .catch(err => {
            console.log(err)
        })

}

const getProdById = async (req, res) => {

    const { prodId } = req.query
    PRODUCT.find({ _id: prodId })
        .then(response => {
            response = response.filter(x => x.visibility)
            res.send({ product: response })
        })
        .catch(err => {
            console.log(err)
        })

}

const getCategory = async (req, res) => {

    await CATEGORY.find({})
        .then(response => {
            res.send(response)
        })
        .catch(error => {
            console.log(error)
            res.send({ error: error })
        })

}

const searchProd = async (req, res) => {
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

const getTotalDocumentsCount = async (req, res) => {
    console.log('ur;', req.url)
    const token = req.cookies.ajwt;
    if (!token)
        return res.status(401).json({ message: 'Session expired', is_user_logged_in: false });

    const { _id } = jwt.verify(token, process.env.SECRETKEY);
    let user = await USER.findOne({ _id })

    try {
        let totalCount = 10;
        if (user.role === 'guest' && req.url !== "/gettotalproductscount") {
            res.send({ totalCount })
        } else {
            switch (req.url) {
                case "/gettotalproductscount":
                    totalCount = await PRODUCT.countDocuments();
                    break;
                case "/gettotalorderscount":
                    totalCount = await ORDER.countDocuments();
                    break;
                case "/gettotaluserscount":
                    totalCount = await USER.countDocuments();
                    break;
                default:
                    totalCount = 10;
                    break;
            }

            res.send({ totalCount })
        }
    } catch (error) {
        console.error('Error:', error);
        res.send({ error: error })
    }
};

const signMeOut = async (req, res) => {
    try {
        const { isAdmin } = req.query;
        if(isAdmin==="true"){
            res.clearCookie('ajwt')
        }else{
            res.clearCookie('jwt')
        }
        res.status(200).json({ message: "Logged out successfully!!!", is_user_logged_in: false })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', is_user_logged_in: true });
    }
}

module.exports = { getTotalDocumentsCount, getProducts, getProdByCategory, getProdById, getCategory, searchProd, signMeOut }