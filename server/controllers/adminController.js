//Schema
const USER = require('../models/user');
const PRODUCT = require('../models/product')
const CATEGORY = require('../models/category')
const ORDER = require('./../models/orders')



const authentication = async (req, res) => {
    console.log('res.user', res.user)
    res.status(200).json({ message: "Admin Authentication Successfull!!!", is_user_logged_in: true })
}

const getOrders=async (req, res) => {
    //this will get orders of all the users and not only one loggged in user
    //also chekc irst if the account accessing this route is admin only
    // const { orderId } = req.query
    const token = req.cookies.jwt;

    //any user should be able to access admin panel

    //thi is common for most user actions ,so create a middleware function instead
    if (!token) {
        return res.status(401).json({ message: 'Session expired', is_user_logged_in: false });
    }
    try {
        // const decoded = jwt.verify(token, process.env.SECRETKEY);

        ORDER.find({}).populate('user')
            .then(response => {
                console.log('sss', response)
                return res.status(200).json({ data: response, is_user_logged_in: true });
            })
            .catch(err => {
                console.log(err)
            })

    } catch (error) {
        console.error('Error getting items from wishlist', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

//admin rights only
const getUsers=async (req, res) => {

    // const { orderId } = req.query
    const token = req.cookies.jwt;

    // console.log('orderId', orderId)
    //thi is common for most user actions ,so create a middleware function instead
    if (!token) {
        return res.status(401).json({ message: 'Session expired', is_user_logged_in: false });
    }
    try {
        // const decoded = jwt.verify(token, process.env.SECRETKEY);

        USER.find({})
            .then(response => {
                console.log('u', response)
                return res.status(200).json({ data: response, is_user_logged_in: true });
            })
            .catch(err => {
                console.log(err)
            })

    } catch (error) {
        console.error('Error fetching users list', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

const deleteUser=async (req, res) => {
    //655b706b0ad7052dc2ce74c8

    // try {
    //     let result = await USER.deleteOne({ _id: "655b706b0ad7052dc2ce74c8" })
    //     if (result.deletedCount > 0) {
    //         console.log('result', result)
    //     }
    // } catch (err) {
    //     console.log(err);
    // }
}

//setting blogs visibility
const setProductVisibility= async (req, res) => {
    const details = req.body;
    console.log("s--s-s-s-s", details)
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

//this one should has authenitcate user mididleware for admin only
const addProduct= async (req, res) => {

    const { name, price, description, category, image, stock } = req.body;
    //console.log('dd', name, price, description, category, image, stock)

    //const data= JSON.parse(req.body)

    //here admin authnetication shopuld be done, all the modifications rights should be for admin only

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
            console.log('response', response)
            res.status(200).json({ message: `Product has been added` });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Product couldn't be added. Something went wrong" });
        })

}

const editProduct= async (req, res) => {

    const { name, price, description, category, image, stock, discount, id } = req.body;
    // console.log('dd', name, price, description, category, image, stock, discount, id)

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

const addCategory= async (req, res) => {

    const { name, subCategory } = req.body;
    console.log('cat api', name, subCategory)


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



const deleteProduct= async (req, res) => {

    const { id } = req.body;

    try {
        let result = await PRODUCT.deleteOne({ _id: id })
        if (result.deletedCount > 0) {
            console.log('result', result)
            res.status(200).json({ message: "Product deleted successfully" });
        } else {
            res.status(500).json({ message: "Product couldn't be deleted" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error. Something went wrong" });
    }
}


module.exports={authentication,getOrders,getUsers,deleteUser,setProductVisibility,addProduct,editProduct,addCategory,deleteProduct}