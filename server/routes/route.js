const express = require('express');
const router = express('router');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const stripe = require('stripe')(process.env.SK);
const { v4: uuidv4 } = require('uuid');
// const bcrypt = require('bcryptjs');

router.use(bodyParser.urlencoded({ extended: true }));//for checkout passed values
router.use(bodyParser.json())
router.use(cookieParser());
router.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf } }));
dotenv.config({ path: './env/config.env' });


/************************************* SCHEMA ***************************************/
const USER = require('../models/user');
const PRODUCT = require('../models/product')
const CATEGORY = require('../models/category')
const ORDER = require('./../models/orders')
/************************************* SCHEMA ***************************************/



// Authorization middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token || token !== `Bearer ${process.env.SECRET_KEY}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

const authenticateUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token)
        return res.status(401).json({ message: 'Session expired', is_user_logged_in: false });

    const { _id } = jwt.verify(token, process.env.SECRETKEY);
    let user = await USER.findOne({ _id }).populate('cartProducts')//populating field by mongoose virtual
    //populating with regular populate which can cause performnace overhead
    // const user = await USER.findById(decoded._id).populate('cart.productId').populate('wishlist.productId');
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    if (!user.firstname) {
        return res.status(404).json({ message: 'Please add your name to proceed further', name:false });
    }

    // console.log('uueueue', user)
    req.user = user;
    next();
};


const authenticateAdmin = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token)
        return res.status(401).json({ message: 'Session expired', is_user_logged_in: false });

    const { _id } = jwt.verify(token, process.env.SECRETKEY);
    let user = await USER.findOne({ _id })
    if (!user) {
        return res.status(404).json({ message: 'User not found.', is_user_logged_in: false });
    }

    if (user.role !== "admin" && user.email !== process.env.ADMIN_ID) {
        return res.status(404).json({ message: 'Authentication failed!!!', is_user_logged_in: false });
    }

    req.user = user;//this may not be needed for admin
    next();
};

/***********************************************************************
 * 
 ***************************** @USER_APIs ******************************
 *
***********************************************************************/
router.get('/xx', async (req, res) => {
    //655b706b0ad7052dc2ce74c8

    // try {
    //     let result = await USER.deleteOne({ _id: "655b706b0ad7052dc2ce74c8" })
    //     if (result.deletedCount > 0) {
    //         console.log('result', result)
    //     }
    // } catch (err) {
    //     console.log(err);
    // }
})



/*********************************** USER ***********************************/
//check if this api is needed to be called every time as every route has authentication  middleware //also make every route return user object maybe it will fullfilll this route's ojective completely
router.get('/api/getUserInfo', authenticateUser, async (req, res) => {
    try {
        res.status(200).json({ message: 'Access granted.', is_user_logged_in: true, user: req.user });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.', is_user_logged_in: false });
    }
});

router.get('/api/signmeout', authenticateUser, async (req, res) => {
    try {
        res.clearCookie('jwt')
        res.status(200).json({ message: "User logged out!!!" ,is_user_logged_in: false})
    } catch (error) {
        res.status(500).json({ message: 'Internal server error',is_user_logged_in: true });
    }
})

router.post('/api/signup', async (req, res) => {

    const { firstname, lastname, email, photo } = req.body;
    //need to handle more details when there is other method of signing up other than google
console.log('firstname, lastname, email, photo',firstname, lastname, email, photo)
    try {
        const userExist = await USER.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ message: "User already exists!!! Try Signing in instead", is_user_created: false, is_user_logged_in: false });
        }

        const newUser = new USER({ firstname: firstname, lastname: lastname, email: email, avtar: photo });

        const { token, user } = await newUser.generateAuthToken();
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 10800000),
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
        });

        res.status(201).json({ message: "Account created successfully", is_user_created: true, is_user_logged_in: true, user })

    } catch (err) {
        console.log(err);
    }
})

router.post('/api/signin', async (req, res) => {

    try {
        const { email, isAdminLogin } = req.body;
        console.log('isAdminLogin', isAdminLogin)
        const user = await USER.findOne({ email: email }).populate('cartProducts');

        if (user) {
            if (isAdminLogin) {
                if (user.role !== "admin" && user.email !== process.env.ADMIN_ID) {
                    return res.status(404).json({ message: 'Access denied!!!', is_user_logged_in: false });
                } else {
                    const { token } = await user.generateAuthToken();
                    res.cookie('jwt', token, {
                        expires: new Date(Date.now() + 10800000),
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== "development",
                    });
                    return res.status(200).json({ message: "Admin logged in successfully", is_user_logged_in: true, user });
                }
            }
            const { token } = await user.generateAuthToken();
            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 10800000),
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
            });

            res.status(200).json({ message: "User logged in successfully", is_user_logged_in: true, user });
        } else {
            res.status(400).json({ message: "Account doesn't exists", is_user_logged_in: false, });
        }

    } catch (err) {
        console.log(err);
    }
})

router.post('/api/updatedaddress', authenticateUser, async (req, res) => {
    try {
        const { address } = req.body;

        let updatedUser = await USER.findByIdAndUpdate(
            req.user._id,
            { address: address, phone: (req.user.phone !== address.phone) ? address.phone : req.user.phone },
            { new: true }
        ).populate('cartProducts');
        res.status(200).json({ message: 'User details updated.', user: updatedUser });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal server error' });
    }
})
/*********************************** USER ***********************************/



/*********************************** CART ***********************************/
router.post('/api/addtocart', authenticateUser, async (req, res) => {

    try {
        const { productId } = req.body;
        const product = await PRODUCT.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        // Finding the product in the user's cart
        const cartItem = req.user.cart.find(item => item.productId.toString() === productId);
        cartItem ? cartItem.quantity += 1 : req.user.cart.push({ productId });
        await req.user.save();

        const populatedDoc = await USER.findById(req.user._id).populate('cartProducts');
        res.status(200).json({ message: 'Product added to cart.', user: populatedDoc });

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal server error' });
    }
})
router.post('/api/updatecart', authenticateUser, async (req, res) => {

    try {
        const cartItems = req.body;

        let theCart = req.user.cart;
        theCart.map((existingCartItem) => {
            cartItems.map(x => {
                if (x.productId.toString() === existingCartItem.productId.toString()) {
                    existingCartItem.quantity = x.quantity;
                }
            })
        });

        await USER.updateOne(
            { _id: req.user._id },
            { $set: { cart: theCart } }
        );

        const populatedDoc = await USER.findById(req.user._id)//.populate('cartProducts');//cartitems may not be needed here to populate
        res.status(200).json({ message: 'Quantity updated', user: populatedDoc });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal server error' });
    }
})
router.post('/api/removefromcart', authenticateUser, async (req, res) => {

    try {
        const { productId } = req.body;
        const updatedUser = await USER.findByIdAndUpdate(
            req.user._id,
            { $pull: { cart: { productId } } },
            { new: true }
        ).populate('cartProducts');

        res.status(200).json({ message: 'Product removed from cart.', user: updatedUser });
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
//NOT_IN_USE
router.get('/api/getcartitems', authenticateUser, async (req, res) => {
    try {
        res.status(200).json({ message: 'Access granted.', cartItems: req.user.cartProducts });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})
/*********************************** CART ***********************************/



/*********************************** WISHLIST ***********************************/
//adding and removing from wishlist
router.post('/api/updatewishlist', authenticateUser, async (req, res) => {

    try {
        const { productId } = req.body;

        // Find the product in the user's cart
        const wishlistItem = req.user.wishlist.find(item => item.toString() === productId);

        let updatedUser;
        if (wishlistItem) {
            //removing the product from wishlist if already there
            updatedUser = await USER.findByIdAndUpdate(
                req.user._id,
                { $pull: { wishlist: productId } },
                { new: true }
            ).populate('cartProducts');
            res.status(200).json({ message: 'Product removed from wishlist.', user: updatedUser });
        } else {
            //adding the product to wishlist
            updatedUser = await USER.findByIdAndUpdate(
                req.user._id,
                { $push: { wishlist: productId } },
                { new: true }
            ).populate('cartProducts');
            res.status(200).json({ message: 'Product added to wishlist.', user: updatedUser });
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal server error' });
    }
})
//remove from cart and add to wishlist
router.post('/api/movetowishlist', authenticateUser, async (req, res) => {

    try {
        const { productId } = req.body;
        const updatedUser = await USER.findByIdAndUpdate(
            req.user._id,
            {
                $pull: { cart: { productId } },//removing from cart
                $push: { wishlist: productId },//adding to wishlist
            },
            { new: true }
        ).populate('cartProducts');

        res.status(200).json({ message: 'Product moved to wishlist', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.post('/api/getwishlistitems', authenticateUser, async (req, res) => {

    const { ids } = req.body
    try {
        const items = await PRODUCT.find({ _id: { $in: ids } });
        res.status(200).json({ items });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})
/*********************************** WISHLIST ***********************************/


/*********************************** ORDER ***********************************/
router.get('/api/getorders', authenticateUser, async (req, res) => {

    const { orderId } = req.query
    try {

        let response = await USER.findOne({ _id: req.user._id }, { orders: 1, _id: 0 })
        const order = response?.orders.find(item => item.orderId === orderId)
        if (orderId) {
            return res.status(200).json({ order });
        } else {
            return res.status(200).json({ user: response });
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})
/*********************************** ORDER ***********************************/


/*********************************** CHECKOUT  ***********************************/
//NOTE::: DONT LET USER ADD MORE THAN 50 ITEMS AS IT WOULD BREAK THE STRIPE,,metadata object can only have 50 keys(which are products in our case),show user a warning that we dont support bulk order at the moment ,out of 50, 3 keys reserved 

//card for failing : 4000 0000 0000 0119
router.post('/create-checkout-session', authenticateUser, async (req, res) => {

    let line_items = []
    const orderId = uuidv4()
    let productList = {}//for metadata

    console.log('req.body.priceObj--', req.body.priceObj)

    try {
        const data = JSON.parse(req.body.priceObj)
        //meta data has 5 keys for orders details and rest 47 for products
        //maybe we wont need these five to be store in metadat as the session object will be created right here
        // productList.orderId = orderId
        // productList.userId = req.user._id

        if (data.grandTotal > 999999) {
            return res.status(500).json({ message: 'ShoppItt does not support bulk order currently.' });
        }

        productList.tax = data.tax
        productList.shipping = data.shipping
        productList.total = data.grandTotal

        // const taxRate = await stripe.taxRates.create({
        //     display_name: 'Shipping',
        //     description: 'Shipping charges',
        //     percentage: data.shipping,
        //     jurisdiction: 'DE',
        //     inclusive: false,
        //   });

        // const shippingRate = await stripe.shippingRates.create({
        //     display_name: 'Shipping',
        //     type: 'fixed_amount',
        //     fixed_amount: {
        //         amount: 9900,
        //         currency: 'inr',
        //     },
        // });
        // console.log('ttaxxxx------------',shippingRate.id)

        Object.keys(data.productList).forEach(x => {
            let prod = {}

            prod.price_data = {}
            prod.price_data.currency = "inr"
            prod.price_data.product_data = {}
            prod.price_data.product_data.name = data.productList[x].name
            if (data.grandTotal < 999999) {
                // prod.price_data.unit_amount = data.productList[x].price * 100
                if (data.productList[x].discount) {
                    prod.price_data.unit_amount = Math.floor(data.productList[x].price * data.productList[x].discount / 100) * 100;
                } else {
                    prod.price_data.unit_amount = data.productList[x].price * 100;
                }
            } else {
                // prod.price_data.unit_amount = data.productList[x].price
                if (data.productList[x].discount) {

                    prod.price_data.unit_amount = Math.floor(data.productList[x].price * data.productList[x].discount / 100)
                } else {
                    prod.price_data.unit_amount = data.productList[x].price
                }
            }
            prod.quantity = data.productList[x].quantity

            prod.adjustable_quantity = {}
            prod.adjustable_quantity.enabled = true
            prod.adjustable_quantity.minimum = 1
            prod.adjustable_quantity.maximum = 99

            //txr_1OHhX4SJDEVNzqXlTmp6QliB
            prod.tax_rates = [process.env.TAX_RATE_ID]

            line_items.push(prod);

            //for metadata
            productList[x] = {}
            productList[x].name = data.productList[x].name
            productList[x].image = data.productList[x].image
            productList[x].price = data.productList[x].price
            productList[x].quantity = data.productList[x].quantity
            productList[x].discount = data.productList[x].discount
            productList[x] = JSON.stringify(productList[x])//metadata only supports key value(only string) that's why its stringified
        })

        console.log('product LIST-----------------------', line_items)

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            payment_method_types: ['card'],
            success_url: process.env.NODE_ENV === "production" ? `https://shoppitt.onrender.com/orders/${orderId}` : `http://localhost:3006/orders/${orderId}`,
            cancel_url: process.env.NODE_ENV === "production" ? `https://shoppitt.onrender.com/user` : 'http://localhost:3006/user',
            customer_email: req.user.email,
            metadata: productList,
            billing_address_collection: "required",
            shipping_options: [{
                shipping_rate: process.env.SHIPPING_RATE_ID,
            }]
        });

        console.log('session', session)
        if (session) {
            await USER.findByIdAndUpdate(
                req.user._id,
                {
                    $push: {
                        checkoutSession: {
                            sessionId: session.id,
                            orderId: orderId
                        }
                    }
                },
                { new: true }
            )
            // res.redirect(303, session.url);
            res.status(200).json({ url: session.url });
        }
    } catch (error) {
        console.error('something went wrong', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/api/getcheckoutsession', authenticateUser, async (req, res) => {

    const { orderId } = req.query
    try {
        //extracting the session id mapped with order id
        const checkoutSession = req.user?.checkoutSession.find(item => item.orderId === orderId)
        const session = await stripe.checkout.sessions.retrieve(checkoutSession.sessionId);

        if (session?.payment_status === 'paid') {

            //retrieving the payment intent
            const paymentIntent = await stripe.paymentIntents.retrieve(
                session.payment_intent
            );
            // console.log('payment_intent', paymentIntent)

            let metadata = session.metadata
            // console.log('session', session)
            // console.log('metadata', metadata)
            let order = {}
            order.orderId = orderId
            order.tax = metadata.tax
            order.shipping = metadata.shipping
            order.total = metadata.total
            order.payment_status = session.payment_status
            order.receiptUrl = paymentIntent?.charges?.data[0]?.receipt_url
            order.products = []
            prodArray = []
            Object.keys(metadata).forEach(x => {
                if (
                    x !== "tax" && x !== "total" && x !== "shipping" && typeof metadata[x] === "string" // Checks if the value is a string
                ) {
                    let tempObj = {}
                    const productData = JSON.parse(metadata[x]);//parsing the product details from metadata
                    tempObj.productId = x
                    tempObj.name = productData.name
                    tempObj.image = productData.image
                    tempObj.quantity = productData.quantity
                    tempObj.discount = productData.discount
                    tempObj.price = productData.price
                    order.products.push(tempObj)//to insert in user collection
                    prodArray.push(tempObj)//to insert in ORDER collection
                }
            })

            //saving the order details in db
            const updatedUser = await USER.findByIdAndUpdate(
                req.user._id,
                { $push: { orders: order } },
                { new: true }
            )
            // console.log('updatedyuser', updatedUser)

            const theOrder = new ORDER({
                orderId: orderId,
                totalAmount: metadata.total,
                tax: metadata.tax,
                shipping: metadata.shipping,
                payment_status: session.payment_status,
                receiptUrl: paymentIntent?.charges?.data[0]?.receipt_url,
                user: req.user._id,
                products: prodArray,
                shippingAddress: session.customer_details.address,
            })
            theOrder.save()
                .then(response => {
                    console.log('saved order', response)
                })
                .catch(err => {
                    console.log("errror-", err)
                    res.status(500).json({ message: 'Internal server error' });
                })

            const data = updatedUser.orders.find(order => order.orderId === orderId)
            return res.status(200).json({ order: data });
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})
/*********************************** CHECKOUT  ***********************************/



/***********************************************************************
 * 
 ***************************** @USER_APIs ******************************
 *
***********************************************************************/






//ADMIN API *****************************************************************************
//authenticate admin account too
router.get('/api/admin/authentication', authenticateAdmin, async (req, res) => {
    console.log('res.user', res.user)
    res.status(200).json({ message: "Admin Authentication Successfull!!!", is_user_logged_in: true })
})

router.get('/api/admin/getorders', async (req, res) => {
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

})

//admin rights only
router.get('/api/admin/getusers', async (req, res) => {

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

})

//setting blogs visibility
router.post("/api/admin/productvisibility", async (req, res) => {
    const details = req.body;
    console.log("s--s-s-s-s", details)
    try {
        let result = await PRODUCT.findOneAndUpdate({ _id: details.id }, { visibility: details.visibility }, { new: true })
        if (result) {
            return res.status(200).json({ message:`Product visibility has been turned ${details.visibility ? "off" : "on"}` });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//this one should has authenitcate user mididleware for admin only
router.post('/api/admin/addproducts', async (req, res) => {

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

})

router.post('/api/admin/editproduct', async (req, res) => {

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
})

router.post('/api/admin/addcategory', async (req, res) => {

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

})
//ADMIN API *****************************************************************************



// APIs that dont need authentication so that everyone can access the basic features
/*********************************** COMMON APIs ***********************************/
router.get('/api/getproducts', async (req, res) => {

    const { limit } = req.query
    await PRODUCT.find({}).limit(limit)
        .then(response => {
            res.send(response)
        })
        .catch(error => {
            console.log(error)
            res.send({ error: error })
        })
})

router.get('/api/getprodbycategory', async (req, res) => {

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

})

router.get('/api/getprodbyid', async (req, res) => {

    const { prodId } = req.query

    PRODUCT.find({ _id: prodId })
        .then(response => {
            response=response.filter(x=>x.visibility)
            res.send({ product: response })
        })
        .catch(err => {
            console.log(err)
        })

})

router.get('/api/getcategory', async (req, res) => {

    await CATEGORY.find({})
        .then(response => {
            res.send(response)
        })
        .catch(error => {
            console.log(error)
            res.send({ error: error })
        })

})

router.post("/api/searchprod", async (req, res) => {
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
});
/*********************************** COMMON APIs ***********************************/


//deleting blog record
router.post("/deleteblog", authenticateAdmin, async (req, res) => {
    const details = req.body;

    try {
        let result = await BLOG.deleteOne({ _id: details.id })
        if (result.deletedCount > 0) {
            res.send({ isDeleted: true });
            console.log('result', result)
        }
    } catch (err) {
        console.log(err);
    }
});



// [
//     'smartphones',         'laptops',            'iPads',
//     'Tablets',             'Headphones',         'Earphones',
//     'DSLR',                'controllers',        'printers',
//     'home audio',          'smartwatch',         'smart band',
//     'desktop computers',   'Televisions',        'mouse',
//     'computer processors', 'bluetooth speakers', 'Fitness Trackers',
//     'VR Headsets',         'Wearable Devices',   'MP3 Player',
//     'Camcorder ',          'pendrive',           'xbox',
//     'playstation',         'Drones',             'Routers',
//     'Modems',              'Power bank',         'Projectors',
//     'refrigerator',        'Washing Machine',    'microwave',
//     'Air Conditioner',     'Heaters',            'operating system',
//     'antivirus',           'MS office',          'Graphics Cards',
//     'RAM',                 'SSDs',               'amazon echo',
//     'google home',         'Digital Camera',     'keyboards',
//     'monitors'
// ]


module.exports = router;