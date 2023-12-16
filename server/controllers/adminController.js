const USER = require('../models/user');
const PRODUCT = require('../models/product')
const CATEGORY = require('../models/category')
const ORDER = require('./../models/orders')

const authentication = async (req, res) => {
    res.status(200).json({ message: "Admin Authentication Successfull!!!", is_user_logged_in: true })
}

const getOrders = async (req, res) => {
    try {
        ORDER.find({}).populate('user')
            .then(response => {
                return res.status(200).json({ data: response, is_user_logged_in: true });
            })
            .catch(err => {
                console.log(err)
            })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getUsers = async (req, res) => {
    try {
        USER.find({})
            .then(response => {
                return res.status(200).json({ data: response, is_user_logged_in: true });
            })
            .catch(err => {
                console.log(err)
            })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const setProductVisibility = async (req, res) => {
    const details = req.body;
    try {
        let result = await PRODUCT.findOneAndUpdate({ _id: details.id }, { visibility: details.visibility }, { new: true })
        if (result) {
            return res.status(200).json({ message: `Product visibility has been turned ${details.visibility ? "off" : "on"}` });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const addProduct = async (req, res) => {

    const { name, price, description, category, image, stock } = req.body;
    const product = new PRODUCT({
        name: name,
        price: price,
        description: description,
        category: category,
        image: image,
        stock: stock,
    })

    product.save()
        .then(response => {
            res.status(200).json({ message: `Product has been added` });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Product couldn't be added. Something went wrong" });
        })
}

const editProduct = async (req, res) => {

    const { name, price, description, category, image, stock, discount, id } = req.body;

    try {
        const result = await PRODUCT.findOneAndUpdate({ _id: id }, { $set: { name, price, description, category, image, stock, discount } }, { new: true })
        if (result) {
            res.status(200).json({ message: `Product has been edited` });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Product couldn't be edited. Something went wrong" });
    }
}

const addCategory = async (req, res) => {

    const { name, subCategory } = req.body;

    const catagory = new CATEGORY({
        name: name,
        subCategory: subCategory
    })

    catagory.save()
        .then(response => {
            res.send({ data: true });
        })
        .catch(err => {
            console.log(err)
            res.send({ data: false });
        })
}

const deleteProduct = async (req, res) => {

    const { id } = req.body;

    try {
        let result = await PRODUCT.deleteOne({ _id: id })
        if (result.deletedCount > 0) {
            res.status(200).json({ message: "Product deleted successfully" });
        } else {
            res.status(500).json({ message: "Product couldn't be deleted" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error. Something went wrong" });
    }
}

module.exports = { authentication, getOrders, getUsers, setProductVisibility, addProduct, editProduct, addCategory, deleteProduct }