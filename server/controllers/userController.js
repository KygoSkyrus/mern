//Schema
const USER = require('../models/user');
const PRODUCT = require('../models/product')
const ORDER = require('./../models/orders')


const getUserInfo= async (req, res) => {
    try {
        res.status(200).json({ message: 'Access granted.', is_user_logged_in: true, user: req.user });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.', is_user_logged_in: false });
    }
}

const signMeOut =async (req, res) => {
    try {
        res.clearCookie('jwt')
        res.status(200).json({ message: "Logged out successfully!!!" ,is_user_logged_in: false})
    } catch (error) {
        res.status(500).json({ message: 'Internal server error',is_user_logged_in: true });
    }
}

const updateAddress = async (req, res) => {
    try {
        const { address,firstname,lastname,avtar } = req.body;

        let updatedUser = await USER.findByIdAndUpdate(
            req.user._id,
            { address: address,firstname:firstname,lastname:lastname,avtar:avtar, phone: (req.user.phone !== address.phone) ? address.phone : req.user.phone },
            { new: true }
        ).populate('cartProducts');
        res.status(200).json({ message: 'User details updated.', user: updatedUser });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal server error' });
    }
}


/*********************************** CART ***********************************/
const addToCart=async (req, res) => {

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
}

const updateCart= async (req, res) => {

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
}

const removeFromCart = async (req, res) => {

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
}

const getCartItems =async (req, res) => {
    try {
        res.status(200).json({ message: 'Access granted.', cartItems: req.user.cartProducts });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
/*********************************** CART ***********************************/



/*********************************** WISHLIST ***********************************/
//adding and removing from wishlist
const updateWishlist=async (req, res) => {

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
}
//remove from cart and add to wishlist
const moveToWishlist = async (req, res) => {

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
}
const getWishlistItems=async (req, res) => {

    const { ids } = req.body
    try {
        const items = await PRODUCT.find({ _id: { $in: ids } });
        res.status(200).json({ items });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
/*********************************** WISHLIST ***********************************/


/*********************************** ORDER ***********************************/
const getOrders= async (req, res) => {

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
}
/*********************************** ORDER ***********************************/


/*********************************** CHECKOUT  ***********************************/
//NOTE::: DONT LET USER ADD MORE THAN 50 ITEMS AS IT WOULD BREAK THE STRIPE,,metadata object can only have 50 keys(which are products in our case),show user a warning that we dont support bulk order at the moment ,out of 50, 3 keys reserved 

//card for failing : 4000 0000 0000 0119
const createCheckoutSession= async (req, res) => {

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
}

const getCheckoutSession= async (req, res) => {

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
}
/*********************************** CHECKOUT  ***********************************/

module.exports={getUserInfo,signMeOut,updateAddress,addToCart,updateCart,removeFromCart,getCartItems,updateWishlist,moveToWishlist,getWishlistItems,getOrders,createCheckoutSession,getCheckoutSession}