const USER = require('../models/user');
const PRODUCT = require('../models/product');
const CATEGORY = require('../models/category');
const ORDER = require('./../models/orders');
const dummyOrders = require('../dummy/dummyOrders');
const dummyUsers = require('../dummy/dummyUsers');

const authentication = async (req, res) => {
    res.status(200).json({ message: "Admin Authentication Successfull!!!", is_user_logged_in: true, user: req.user })
}

const getOrders = async (req, res) => {
    try {
        if (req.user?.role === "guest") {
            console.log('isndie gieys')
            return res.status(200).json({ data: dummyOrders, is_user_logged_in: true });
        } else {
            const { limit, page } = req.query;
            ORDER.find({})
                .skip((page - 1) * limit)
                .limit(limit)
                .populate({
                path: 'user',
                select: ['firstname', 'lastname', 'email', 'avtar', 'phone', 'address']
            })
                .then(response => {
                    return res.status(200).json({ data: response, is_user_logged_in: true });
                })
                .catch(err => {
                    console.log(err)
                })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getUsers = async (req, res) => {
    try {
        if (req.user?.role === "guest") {
            return res.status(200).json({ data: dummyUsers, is_user_logged_in: true });
        } else {
            // USER.find({}, { firstname: 1, lastname: 1, email: 1, avtar: 1, orders: 1, createdAt: 1, _id: 1 })
            USER.aggregate([ //to fetch only necessary data
                {
                  $project: {
                    _id: 1,
                    email: 1,
                    firstname: 1, 
                    lastname: 1, 
                    avtar: 1, 
                    ordersSize: { $cond: { if: { $isArray: "$orders" }, then: { $size: "$orders" }, else: 0 } },
                    createdAt: 1,
                  }
                }
              ])
                .then(response => {
                    return res.status(200).json({ data: response, is_user_logged_in: true });
                })
                .catch(err => {
                    console.log(err)
                })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const setProductVisibility = async (req, res) => {
    try {
        const details = req.body;
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
    try {
        const { name, price, description, category, image, stock } = req.body;
        const product = new PRODUCT({
            name: name,
            price: price,
            description: description,
            category: category,
            image: image,
            stock: stock,
        })

        await product.save()
        return res.status(200).json({ message: `Product has been added` });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Product couldn't be added. Something went wrong" });
    }
}

const editProduct = async (req, res) => {
    try {
        const { name, price, description, category, image, stock, discount, id } = req.body;

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
    try {
        const { name, subCategory } = req.body;
        const catagory = new CATEGORY({
            name: name,
            subCategory: subCategory
        })

        await catagory.save()
        return res.send({ data: true });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error. Something went wrong" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;
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