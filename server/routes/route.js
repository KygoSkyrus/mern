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

    console.log('uueueue', user)
    req.user = user;
    next();
};


const authenticateAdmin = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token)
        return res.status(401).json({ message: 'Session expired', is_user_logged_in: false, isUserAuthenticated: false });

    const { _id } = jwt.verify(token, process.env.SECRETKEY);
    let user = await USER.findOne({ _id })
    if (!user) {
        return res.status(404).json({ message: 'User not found.', isUserAuthenticated: false });
    }

    if (user.role !== "admin" && user.email !== process.env.ADMIN_ID) {
        return res.status(404).json({ message: 'Authentication failed!!!', isUserAuthenticated: false });
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

router.get('/api/signmeout', async (req, res) => {
    try {
        res.clearCookie('jwt')
        res.status(200).json({ message: "User logged out!!!" })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
})

router.post('/api/signup', async (req, res) => {

    const { firstname, lastname, email, photo } = req.body;
    //need to handle more details when there is other methof of sign up other than google

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
        const { email } = req.body;
        const user = await USER.findOne({ email: email }).populate('cartProducts');

        if (user) {
            const { token } = await user.generateAuthToken();
            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 10800000),
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
            });

            res.status(200).json({ message: "User logged in successfully", is_user_logged_in: true, user });//send the 
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
        res.status(500).json({ message: 'Internal server error.' });
    }
})
/*********************************** USER ***********************************/



/*********************************** CART ***********************************/
router.post('/api/addtocart', authenticateUser, async (req, res) => {
    // const token = req.cookies.jwt;

    try {
        const { productId } = req.body;
        // const decoded = jwt.verify(token, process.env.SECRETKEY);

        // const user = await USER.findById(decoded._id);
        //  if (!user) {
        //    return res.status(404).json({ message: 'User not found.' });
        //  }

        const product = await PRODUCT.findById(productId);
        //  if (!product) {
        //    return res.status(404).json({ message: 'Product not found.' });
        //  }

        // Find the product in the user's cart
        const cartItem = req.user.cart.find(item => item.productId.toString() === productId);

        if (cartItem) {
            // If the product is already in the cart, increment the quantity
            cartItem.quantity += 1;
        } else {
            // If the product is not in the cart, add it with quantity 1
            req.user.cart.push({ productId });
        }

        // Save the updated user
        await req.user.save()
        const populatedDoc = await USER.findById(req.user._id).populate('cartProducts');

        res.status(200).json({ message: 'Product added to cart.', user: populatedDoc });

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal server error.' });
    }
})
router.post('/api/updatecart', authenticateUser, async (req, res) => {
    // const token = req.cookies.jwt;

    try {
        const cartItems = req.body;
        // const decoded = jwt.verify(token, process.env.SECRETKEY);
        console.log('caritem', cartItems)


        // const user = await USER.findById(decoded._id);

        //this is not working 
        let theCart = req.user.cart;
        //console.log('thecart before',theCart)
        const updatedCartItems = theCart.map((existingCartItem) => {

            const matchingCartItem = cartItems.find((newCartItem) => {
                console.log('fff', newCartItem.productId.toString(), "   ", existingCartItem.productId.toString())
                return newCartItem.productId.toString() === existingCartItem.productId.toString()
            }
            );

            cartItems.map(x => {
                if (x.productId.toString() === existingCartItem.productId.toString()) {
                    existingCartItem.quantity = x.quantity;
                }
            })

            console.log('matchingcatritem', matchingCartItem)

            if (matchingCartItem) {
                // Update the quantity of the existing cart item
                return {
                    ...existingCartItem,
                    quantity: matchingCartItem.quantity,
                };
            } else {
                // Keep the existing cart item as is
                return existingCartItem;
            }
        });

        // console.log('updatedUser--',updatedCartItems)
        const theUser = await USER.updateOne(
            { _id: req.user._id },
            { $set: { cart: theCart } }
        );
        console.log('theUser', theUser)
        //await USER.findByIdAndUpdate(decoded._id, { cart: updatedCartItems });


        const populatedDoc = await USER.findById(req.user._id)//.populate('cartProducts');//cat=rtitems may not be needed here to populate

        res.status(200).json({ message: 'Quantity updated', user: populatedDoc });

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal server error.' });
    }
})
//remove from cart
router.post('/api/removefromcart', authenticateUser, async (req, res) => {
    // const token = req.cookies.jwt;

    try {
        const { productId } = req.body;
        // const decoded = jwt.verify(token, process.env.SECRETKEY);

        // Update the user's cart by removing the specified product
        const updatedUser = await USER.findByIdAndUpdate(
            req.user._id,
            { $pull: { cart: { productId } } },
            { new: true }
        ).populate('cartProducts');//to send the user populated with cart field

        console.log('remove fromcart-', updatedUser)
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'Product removed from cart.', user: updatedUser });
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});
//get cart items
router.get('/api/getcartitems', authenticateUser, async (req, res) => {
    // const token = req.cookies.jwt;
    //thi is common for most user actions ,so create a middleware function instead
    try {

        // const decoded = jwt.verify(token, process.env.SECRETKEY);
        // const user = await USER.findById(decoded._id).populate('cartProducts');

        // if (!user) {
        //     return res.status(404).json({ message: 'User not found.' });
        // }

        // Token is valid, user is signed in
        res.status(200).json({ message: 'Access granted.', cartItems: req.user.cartProducts });

    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }

})
/*********************************** CART ***********************************/



/*********************************** WISHLIST ***********************************/
//adding and removing from wishlist
router.post('/api/updatewishlist', authenticateUser, async (req, res) => {
    // const token = req.cookies.jwt;
    try {
        const { productId } = req.body;
        // const decoded = jwt.verify(token, process.env.SECRETKEY);

        // const user = await USER.findById(decoded._id);
        // if (!user) {
        //     return res.status(404).json({ message: 'User not found.' });
        // }

        // const product = await PRODUCT.findById(productId);
        //  if (!product) {
        //    return res.status(404).json({ message: 'Product not found.' });
        //  }

        // Find the product in the user's cart
        const wishlistItem = req.user.wishlist.find(item => item.toString() === productId);
        console.log('wishlis', wishlistItem)

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
        res.status(500).json({ message: 'Internal server error.' });
    }
})
//remove from cart and add to wishlist
router.post('/api/movetowishlist', authenticateUser, async (req, res) => {
    //this is mostly same as removefromcart just the adding to wishlist part
    // const token = req.cookies.jwt;
    try {
        const { productId } = req.body;
        // const decoded = jwt.verify(token, process.env.SECRETKEY);

        const updatedUser = await USER.findByIdAndUpdate(
            req.user._id,
            {
                $pull: { cart: { productId } },//removing from cart
                $push: { wishlist: productId }//adding to wishlist
            },
            { new: true }
        ).populate('cartProducts');//to send the user populated with cart field

        // console.log('moved to wishlist', updatedUser)
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'Product moved to wishlist', user: updatedUser });
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});
//get wishlist items
router.post('/api/getwishlistitems', authenticateUser, async (req, res) => {
    // const token = req.cookies.jwt;//the ids should be reterived from here and then the products should be queried/ ids are hefre bcz the wishlist array is being populated for every refresh just like cart  
    const { ids } = req.body

    try {
        const items = await PRODUCT.find({ _id: { $in: ids } });
        console.log('uuu', items)

        res.status(200).json({ items });

    } catch (error) {
        console.error('Error getting items from wishlist', error);
        res.status(500).json({ message: 'Internal server error.' });
    }

})

/*********************************** ORDER ***********************************/
router.get('/api/getorders', authenticateUser, async (req, res) => {

    const { orderId } = req.query
    // const token = req.cookies.jwt;


    try {
        // const decoded = jwt.verify(token, process.env.SECRETKEY);

        let response = await USER.findOne({ _id: req.user._id }, { orders: 1, _id: 0 })
        const order = response?.orders.find(item => item.orderId === orderId)
        if (orderId) {
            return res.status(200).json({ order });
        } else {
            return res.status(200).json({ user: response });
        }


    } catch (error) {
        console.error('Error getting items from wishlist', error);
        res.status(500).json({ message: 'Internal server error.' });
    }

})
/*********************************** ORDER ***********************************/


/*********************************** CHECKOUT  ***********************************/
//NOTE::: DONT LET USER ADD MORE THAN 50 ITEMS AS IT WOULD BREAK THE STRIPE,,metadata onkect can only have 50 keys(whihc are products in our case),,shgow user a waring that we dont support bulk order at the moment ,,out of 50, 4 key s reserved 

//card for failing : 4000 0000 0000 0119
//IF the stirpe accont is activated than there may be a way to send invoice to user
router.post('/create-checkout-session', authenticateUser, async (req, res) => {


    let line_items = []
    const token = req.cookies.jwt;
    const orderId = uuidv4()
    let productList = {}//for metadata

    /*
    -session is created,
    - it has session id annd the metadata
    - session id is mapped with orderid and saved in db
    - when payment is done then the page will redirect to order page with orderid in url
    - the order page can be openend two ways:::
      
    - order page will first query the order list (FIRST scenario) and if the order isnt found then it will chekc if there is a session for that order id (for SECOND scenario)
    
    - FIRST>>>when order is placed>>
        - on order page with the order id reterive the session id from db
        - with the session id the session can be reterived from stripe api and then in that session  id get the paymentIntent id and reterive that too for recipt url
        - get the necessary stuff from metadata and also check if the paymnet is success
        - if succeeded then save that in database,if failed then save in db with failed status,,,,,,
        - if no cation is taken then dont save and also delte that session and orderid from db,,,and show payment isnt completed bcz no action was taken

      - SECOND>>>when order is opened from orderList
        - if the order is visible in order list page ten it means it was saved ,,,its simple just get the order from db with order id
    */

    //thi is common for most user actions ,so create a middleware function instead

    try {
        const decoded = jwt.verify(token, process.env.SECRETKEY);//for user id

        const data = JSON.parse(req.body.priceObj)
        //meta data has 5 keys for orders details and rest 45 for products
        //maybe we wont need these five to be store in metadat as the session object will be created right here
        productList.orderId = orderId
        productList.userId = decoded._id//should be req.user._id here
        productList.tax = data.tax
        productList.shipping = data.shipping
        productList.total = data.grandTotal


        Object.keys(data.productList).forEach(x => {
            let prod = {}

            prod.price_data = {}
            prod.price_data.currency = "inr"
            prod.price_data.product_data = {}
            prod.price_data.product_data.name = data.productList[x].name
            if (data.grandTotal < 999999) {
                prod.price_data.unit_amount = data.productList[x].price * 100
            } else {
                prod.price_data.unit_amount = data.productList[x].price
            }
            prod.quantity = data.productList[x].quantity

            prod.adjustable_quantity = {}
            prod.adjustable_quantity.enabled = true
            prod.adjustable_quantity.minimum = 1
            prod.adjustable_quantity.maximum = 99

            //for metadata
            productList[x] = {}
            productList[x].name = data.productList[x].name
            productList[x].image = data.productList[x].image
            productList[x].price = data.productList[x].price
            productList[x].quantity = data.productList[x].quantity
            productList[x].discount = data.productList[x].discount
            productList[x] = JSON.stringify(productList[x])//metadata only supports key value(only string) that's why its stringified

            line_items.push(prod)
        })

        //console.log('productList', productList)

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            payment_method_types: ['card'],
            success_url: process.env.NODE_ENV === "production" ? `https://shoppitt.onrender.com/orders/${orderId}` : `http://localhost:3006/orders/${orderId}`,
            cancel_url: process.env.NODE_ENV === "production" ? `https://shoppitt.onrender.com/user` : 'http://localhost:3006/user',
            customer_email: req.cookies.email,
            metadata: productList,
            billing_address_collection: "required",
            // total_details:{
            //     amount_discount:443,
            //     amount_tax:33
            // }
            //shipping_address_collection:"required"
        });

        console.log('session', session)
        if (session) {


            //saving the session id with orderid in db 
            const user = await USER.findByIdAndUpdate(
                decoded._id,
                {
                    $push: {
                        checkoutSession: {
                            sessionId: session.id,
                            orderId: orderId
                        }
                    }
                },
                { new: true }
            )//.populate('cartProducts');


            // let metadata = session.metadata
            // console.log('session', session)
            // console.log('meta data', metadata)
            // let order = {}
            // order.orderId = orderId
            // order.tax = metadata.tax
            // order.shipping = metadata.shipping
            // order.total = metadata.total
            // order.payment_status = session.payment_status
            // order.receiptUrl = ''
            // order.products = []
            // prodArray = []
            // Object.keys(metadata).forEach(x => {
            //     if (
            //         x !== "tax" && x !== "total" && x !== "shipping" && x !== "orderId" && x !== "userId" &&
            //         typeof metadata[x] === "string" // Checks if the value is a string
            //     ) {
            //         let tempObj = {}
            //         //parsing the product details from metadata
            //         const productData = JSON.parse(metadata[x]);
            //         tempObj.productId = x
            //         tempObj.name = productData.name
            //         tempObj.image = productData.image
            //         tempObj.quantity = productData.quantity
            //         tempObj.discount = productData.discount
            //         tempObj.price = productData.price
            //         order.products.push(tempObj)
            //         prodArray.push(tempObj)//for ORDER collection
            //     }
            // })

            // //saving the order details in db

            // const updatedUser = await USER.findByIdAndUpdate(
            //     metadata.userId,
            //     { $push: { orders: order } },
            //     { new: true }
            // )//.populate('cartProducts');

            // const theOrder = new ORDER({
            //     orderId: metadata.orderId,
            //     totalAmount: metadata.total,
            //     tax: metadata.tax,
            //     shipping: metadata.shipping,
            //     payment_status: sessionpayment_status,
            //     receiptUrl: receiptUrl,
            //     user: metadata.userId,
            //     products: prodArray,
            //     shippingAddress: session.customer_details.address,
            //     // paymentMethod: {
            //     //   enum: ['Card', 'PayPal', 'Cash on Delivery', 'Other'],
            //     //   default: 'Card',
            //     // },
            // })
            // theOrder.save()
            //     .then(response => {
            //         console.log('saved order', response)
            //     })
            //     .catch(err => {
            //         console.log("errror-", err)
            //         res.status(500).json({ message: 'Internal server error.' });
            //     })

            res.redirect(303, session.url);//redirects to checkout page
        }
    } catch (error) {
        console.error('something went wrong', error);
        res.status(500).json({ message: 'Internal server error.' });
    }


});

router.get('/api/getcheckoutsession', authenticateUser, async (req, res) => {
    const { orderId } = req.query
    console.log('orderId', orderId)

    try {
        const decoded = jwt.verify(token, process.env.SECRETKEY);

        //extracting the session id mapped with order id
        const checkoutSession = req.user?.checkoutSession.find(item => item.orderId === orderId)
        console.log('checkoutSession', checkoutSession)

        const session = await stripe.checkout.sessions.retrieve(
            checkoutSession.sessionId
        );
        if (session?.payment_status === 'paid') {

            //getting the payment intent
            const paymentIntent = await stripe.paymentIntents.retrieve(
                session.payment_intent
            );
            console.log('payment_intent', paymentIntent)

            let metadata = session.metadata
            console.log('session', session)
            console.log('metadata', metadata)
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
                    x !== "tax" && x !== "total" && x !== "shipping" && x !== "orderId" && x !== "userId" &&
                    typeof metadata[x] === "string" // Checks if the value is a string
                ) {
                    let tempObj = {}
                    //parsing the product details from metadata
                    const productData = JSON.parse(metadata[x]);
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
                metadata.userId,
                { $push: { orders: order } },
                { new: true }
            )//.populate('cartProducts');

            const theOrder = new ORDER({
                orderId: metadata.orderId,
                totalAmount: metadata.total,
                tax: metadata.tax,
                shipping: metadata.shipping,
                payment_status: session.payment_status,
                receiptUrl: paymentIntent?.charges?.data[0]?.receipt_url,
                user: metadata.userId,
                products: prodArray,
                shippingAddress: session.customer_details.address,
                // paymentMethod: {
                //   enum: ['Card', 'PayPal', 'Cash on Delivery', 'Other'],
                //   default: 'Card',
                // },
            })
            theOrder.save()
                .then(response => {
                    console.log('saved order', response)
                })
                .catch(err => {
                    console.log("errror-", err)
                    res.status(500).json({ message: 'Internal server error.' });
                })

            const data = updatedUser.orders.find(order => order.orderId === orderId)

            return res.status(200).json({ order: data });
        }

    } catch (error) {
        console.error('Error session', error);
        res.status(500).json({ message: 'Internal server error.' });
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
    res.status(200).json({ message: "Admin Authentication Successfull!!!", isUserAuthenticated: true })
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
        res.status(500).json({ message: 'Internal server error.' });
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
        console.error('Error getting items from wishlist', error);
        res.status(500).json({ message: 'Internal server error.' });
    }

})

//setting blogs visibility
router.post("/api/admin/productvisibility", async (req, res) => {
    const details = req.body;
    console.log("s--s-s-s-s", details)
    try {
        //findByIdAndUpdate: is the alternatice to directly use id
        let result = await PRODUCT.findOneAndUpdate({ _id: details.id }, { visibility: details.visibility }, { new: true })
        if (result) {
            res.send({ isSet: true })
        } else {
            res.send({ isSet: false })
        }
    } catch (err) {
        console.log(err);
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
            res.send({ is_product_added: true });
        })
        .catch(err => {
            console.log(err)
            res.send({ is_product_added: false });
        })

})

router.post('/api/admin/editproduct', async (req, res) => {

    const { name, price, description, category, image, stock, discount, id } = req.body;
    console.log('dd', name, price, description, category, image, stock, discount, id)

    //const data= JSON.parse(req.body)

    try {
        const result = await PRODUCT.findOneAndUpdate({ _id: id }, { $set: { name, price, description, category, image, stock, discount } }, { new: true })
        if (result) {
            res.send({ isProductEdited: true })
        } else {
            res.send({ isProductEdited: false })
        }
    } catch (error) {
        console.log(error)
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

    //some authentication should be here too

    //check if this is working fine fo dashboard
    const { limit } = req.query
    console.log('hfhfd', limit)

    await PRODUCT.find({}).limit(limit)
        .then(response => {
            // console.log(response)
            res.send(response)
        })
        .catch(error => {
            console.log(error)
            res.send({ error: error })
        })

})

router.get('/api/getprodbycategory', async (req, res) => {

    const { category } = req.query
    console.log('categoryID', category)

    PRODUCT.find({ category: category })
        .then(response => {
            // console.log('sss', response)
            res.send({ products: response })
        })
        .catch(err => {
            console.log(err)
        })

})

router.get('/api/getprodbyid', async (req, res) => {

    const { prodId } = req.query
    console.log('prodid', prodId)

    PRODUCT.find({ _id: prodId })
        .then(response => {
            // console.log('sss', response)
            res.send({ product: response })
        })
        .catch(err => {
            console.log(err)
        })

})

router.get('/api/getcategory', async (req, res) => {

    await CATEGORY.find({})
        .then(response => {
            // console.log(response)
            res.send(response)
        })
        .catch(error => {
            console.log(error)
            res.send({ error: error })
        })

})

router.post("/api/searchprod", async (req, res) => {
    //NOTE::: this uses regex to get documents containing a specific word in db
    const { value } = req.body;
    console.log("dgd", value)

    try {
        if (value === "") {
            res.send([]); //an empty data object is sent
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