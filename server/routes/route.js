const express = require('express');
const router = express('router');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser')
// Use JSON parser for all non-webhook routes
router.use(bodyParser.urlencoded({ extended: true }));//for checkout passed values
router.use((req, res, next) => {
    if (req.originalUrl === "/webhook") {
        next();
    } else {
        bodyParser.json()(req, res, next);
    }
});

const cookieParser = require('cookie-parser');
router.use(cookieParser());

const USER = require('../models/user');

const dotenv = require('dotenv');
dotenv.config({ path: './env/config.env' });
const sk = process.env.SK;

const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(sk);



router.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf } }));

/************* SCHEMA ***************/
const PRODUCT = require('../models/product')
const CATEGORY = require('../models/category')



/*************routes***************/

// const expiresIn = 3600; // 1 hour
// // Generate the JWT
// const token = jwt.sign(userData, 'your_secret_key', { expiresIn });
router.get('/api/getUserInfo', async (req, res) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'Session expired', is_user_logged_in: false });
    }
    //cookie timezone is fucked up,,
    // console.log(new Date(Date.now() + 3600000))
    try {
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        //console.log('decoded', decoded)
        // Check if the token is expired


        //populating with regular populate which can cause performnace overhead
        // const user = await USER.findById(decoded._id)
        //     .populate('cart.productId')
        //   .populate('wishlist.productId');

        //by mongoose virtual
        const user = await USER.findById(decoded._id).populate('cartProducts');
        //console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Token is valid, user is signed in
        res.status(200).json({ message: 'Access granted.', is_user_logged_in: true, user });
    } catch (error) {
        // Invalid token
        console.log(error)
        res.status(401).json({ message: 'Invalid token.', is_user_logged_in: false });
    }
});


router.get('/api/signmeout', async (req, res) => {
    try {
        res.clearCookie('jwt')
        res.clearCookie('email')
        res.status(200).json({ message: "User logged out!!!" })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
})



//signup 
//i dont think jwt is doing anything here
router.post('/api/signup', async (req, res) => {

    const { firstname, lastname, email, photo } = req.body;

    //console.log(firstName, lastName, email, password);

    // if (!firstName || !lastName || !email || !password) {
    //     return res.status(422).json({ error: "fill all details" });
    // }

    try {
        const userExist = await USER.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ message: "User already exists!!! Try signing in instead", is_user_created: false, is_user_logged_in: false });
        }

        const user = new USER({ firstname: firstname, lastname: lastname, email: email, avtar: photo });

        //hashing password

        const newUser = await user.save();
        console.log('dddd', newUser)

        //this and next cookie creatingis same as in signin,,create a commn function for this
        const token = await user.generateAuthToken();
        //console.log(token);
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true
        });
        res.cookie('email', email, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true
        });

        res.status(201).json({ message: "Account created successfully", is_user_created: true, is_user_logged_in: true, user: newUser })//send the user data

    } catch (err) {
        console.log(err);
    }
})



//signin
router.post('/api/signin', async (req, res) => {

    try {
        const { email } = req.body;

        // if (!email || !password) {
        //     return res.status(400).json({ error: "fill all details" });
        // }

        const user = await USER.findOne({ email: email }).populate('cartProducts');

        if (user) {
            // const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await user.generateAuthToken();
            //console.log(token);

            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true
            });
            res.cookie('email', email, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true
            });

            res.status(200).json({ message: "User logged in successfully", is_user_logged_in: true, user });//send the user data alsong with the message
            // if (!isMatch) {
            //     res.status(400).json({ error: "invalid credentials" });
            // } else {
            // }
        } else {
            res.status(400).json({ message: "Account doesn't exists", is_user_logged_in: false, });
        }

    } catch (err) {
        console.log(err);
    }
})



router.post('/api/addtocart', async (req, res) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'Session expired', is_user_logged_in: false });
    }
    try {
        const { productId } = req.body;
        const decoded = jwt.verify(token, process.env.SECRETKEY);

        const user = await USER.findById(decoded._id);
        //  if (!user) {
        //    return res.status(404).json({ message: 'User not found.' });
        //  }

        const product = await PRODUCT.findById(productId);
        //  if (!product) {
        //    return res.status(404).json({ message: 'Product not found.' });
        //  }

        // Find the product in the user's cart
        const cartItem = user.cart.find(item => item.productId.toString() === productId);

        if (cartItem) {
            // If the product is already in the cart, increment the quantity
            cartItem.quantity += 1;
        } else {
            // If the product is not in the cart, add it with quantity 1
            user.cart.push({ productId });
        }

        // Save the updated user
        await user.save()
        const populatedDoc = await USER.findById(decoded._id).populate('cartProducts');

        res.status(200).json({ message: 'Product added to cart.', user: populatedDoc });

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal server error.' });
    }
})

router.post('/api/updatecart', async (req, res) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'Session expired', is_user_logged_in: false });
    }
    try {
        const cartItems = req.body;
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        console.log('caritem', cartItems)


        const user = await USER.findById(decoded._id);

        //this is not working 
        let theCart = user.cart;
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

        //console.log('thecart after',theCart)

        // console.log('updatedUser--',updatedCartItems)
        const theUser = await USER.updateOne(
            { _id: decoded._id },
            { $set: { cart: theCart } }
        );
        console.log('theUser', theUser)
        //await USER.findByIdAndUpdate(decoded._id, { cart: updatedCartItems });


        const populatedDoc = await USER.findById(decoded._id)//.populate('cartProducts');//cat=rtitems may not be needed here to populate

        res.status(200).json({ message: 'Quantity updated', user: populatedDoc });

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal server error.' });
    }
})



//remove from cart
router.post('/api/removefromcart', async (req, res) => {
    const token = req.cookies.jwt;
    //thi is common for most user actions ,so create a middleware function instead
    if (!token) {
        return res.status(401).json({ message: 'Session expired', is_user_logged_in: false });
    }
    try {
        const { productId } = req.body;
        const decoded = jwt.verify(token, process.env.SECRETKEY);

        // Update the user's cart by removing the specified product
        const updatedUser = await USER.findByIdAndUpdate(
            decoded._id,
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
router.get('/api/getcartitems', async (req, res) => {
    const token = req.cookies.jwt;
    //thi is common for most user actions ,so create a middleware function instead
    if (!token) {
        return res.status(401).json({ message: 'Session expired', is_user_logged_in: false });
    }
    try {

        const decoded = jwt.verify(token, process.env.SECRETKEY);
        const user = await USER.findById(decoded._id).populate('cartProducts');

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Token is valid, user is signed in
        res.status(200).json({ message: 'Access granted.', cartItems: user.cartProducts });

    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }

})



//WISHLIST
//adding and removing from wishlist
router.post('/api/updatewishlist', async (req, res) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'Session expired', is_user_logged_in: false });
    }
    try {
        const { productId } = req.body;
        const decoded = jwt.verify(token, process.env.SECRETKEY);

        const user = await USER.findById(decoded._id);
         if (!user) {
           return res.status(404).json({ message: 'User not found.' });
         }

        // const product = await PRODUCT.findById(productId);
        //  if (!product) {
        //    return res.status(404).json({ message: 'Product not found.' });
        //  }

        // Find the product in the user's cart
        const wishlistItem = user.wishlist.find(item => item.toString() === productId);
        console.log('wishlis',wishlistItem)

        let updatedUser;
        if(wishlistItem){
            //adding the product to wishlist
            updatedUser = await USER.findByIdAndUpdate(
                decoded._id,
                { $pull: { wishlist:  productId  } },
                { new: true }
            ).populate('cartProducts');
            res.status(200).json({ message: 'Product removed from wishlist.', user: updatedUser });
        }else{
            //adding the product to wishlist
            updatedUser = await USER.findByIdAndUpdate(
                    decoded._id,
                    { $push: { wishlist:  productId } },
                    { new: true }
                ).populate('cartProducts');      
                res.status(200).json({ message: 'Product added to wishlist.', user: updatedUser });
        }



    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal server error.' });
    }
})

//remove from cart
router.post('/api/movetowishlist', async (req, res) => {
    //this is mostly same as removefromcart just the adding to wishlist part
    const token = req.cookies.jwt;
    //thi is common for most user actions ,so create a middleware function instead
    if (!token) {
        return res.status(401).json({ message: 'Session expired', is_user_logged_in: false });
    }
    try {
        const { productId } = req.body;
        const decoded = jwt.verify(token, process.env.SECRETKEY);



        // Update the user's cart by removing the specified product
        const updatedUser = await USER.findByIdAndUpdate(
            decoded._id,
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



//IF the stirpe accont is activated than there may be a way to send invoice to user
router.post('/create-checkout-session', async (req, res) => {

    //if this doesnt work remove router.use(bodyParser.urlencoded({extended: true})); from top
    const { priceObj } = req.body;

    const data = JSON.parse(priceObj)
    console.log('checkout-----------', data)

    let line_items = []
    Object.keys(data.productList).forEach(x => {
        console.log(data.productList[x].name)

        let prod = {}

        prod.price_data = {}
        prod.price_data.currency = "inr"
        prod.price_data.product_data = {}
        prod.price_data.product_data.name = data.productList[x].name
        if(data.grandTotal<999999){
            prod.price_data.unit_amount = data.productList[x].price*100
        }else{
            prod.price_data.unit_amount = data.productList[x].price
        }
        prod.quantity = data.productList[x].quantity

        prod.adjustable_quantity = {}
        prod.adjustable_quantity.enabled = true
        prod.adjustable_quantity.minimum = 1
        prod.adjustable_quantity.maximum = 300

        line_items.push(prod)
    })
    //console.log('ff',line_items)
    const session = await stripe.checkout.sessions.create({
        line_items,
        // : [
        //     {
        //         price_data: {
        //             currency: 'inr',
        //             product_data: {
        //                 name: 'T-shirt',
        //             },
        //             unit_amount: 30000,
        //         },
        //         quantity: 3,
        //         adjustable_quantity: {
        //             enabled: true,
        //             minimum: 1,
        //             maximum: 50,
        //         }
        //     },
        //     {
        //         price_data: {
        //             currency: 'inr',
        //             product_data: {
        //                 name: 'Bag',
        //             },
        //             unit_amount: 720000,
        //         },
        //         quantity: 1,
        //     },
        // ],
        mode: 'payment',
        payment_method_types: ['card'],
        success_url: 'http://localhost:3006/orders',
        cancel_url: 'http://localhost:3006/user',
        customer_email: 'xyz@email.com',
    });

    // //console.log('session - ', session)

    res.redirect(303, session.url);//redirects to checkout page
});


//   GET /v1/checkout/sessions
//using this uoy cann show all the checkout session whteher failed or succeed in admin panel





//stripe
router.post('/checkout', async (req, res) => {

    const { totalPrice, token } = req.body;
    //console.log("prdouct :", totalPrice);
    //console.log("token :", token);
    const indempontencyKey = uuidv4();

    const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
    });

    const charge = await stripe.charges.create({
        amount: totalPrice.toFixed(2) * 100,
        currency: 'INR',
        customer: customer.id,
        receipt_email: 'custmeridgoeshere@gmail.com',
        description: 'purchase is done',
        shipping: {
            name: token.card.name,
            address: {
                country: token.card.address_country
            },
        }
    }, { idempotencyKey: indempontencyKey });

    res.send(JSON.stringify(charge));//charge is the reponse from stripe with all payment related details

});


router.post('/exist', async (req, res) => {

    try {
        let token = req.cookies.jwt;
        //console.log("token:", token);
        if (token) {
            res.send(JSON.stringify(true));
        } else {
            res.send(JSON.stringify(false));
        }
    } catch (err) {
        console.log(err);
    }

});

router.post('/getemail', async (req, res) => {

    try {
        let email = req.cookies.email;
        //console.log("email:", email);
        res.send(JSON.stringify(email));//sending email from cookies to react
    } catch (err) {
        console.log(err);
    }

});


router.get('/api/getproducts', async (req, res) => {

    await PRODUCT.find({})
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


router.post('/api/addproducts', async (req, res) => {

    const { name, price, description, category, image, stock } = req.body;
    //console.log('dd', name, price, description, category, image, stock)

    //const data= JSON.parse(req.body)


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



router.post('/api/editproduct', async (req, res) => {

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

async function xxx() {
    console.log('xxx')
    USER.find({}).then(res => console.log('xxxxx', res))

    // CATEGORY.updateMany( 
    //     { subCategory: '' }, // Filter documents with empty strings in the array
    //     { $pull: { subCategory: '' } } // Pull (remove) empty strings from the array
    // )
    //     .then((result) => {
    //         console.log(`${result.nModified} documents updated`);
    //     })
    //     .catch((error) => {
    //         console.error('Error updating documents:', error);
    //     });



    // let arr = []
    // await PRODUCT.find({})
    //     .then(response => {

    //         response.map(x => {
    //             if (!arr.includes(x.category)) {
    //                 const category = new CATEGORY({
    //                     name: x.category,
    //                     subCategory: ""
    //                 })

    //                 category.save()
    //                     .then(resp => {
    //                         console.log('response', resp)
    //                         // arr.push(x.category)
    //                     })
    //                     .catch(err1 => {
    //                         console.log(err1)
    //                     })
    //                 arr.push(x.category)
    //             }
    //         })
    //         console.log('aaaaaaaaaaaa', arr)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })


    //  CATEGORY
    //     .findOne({ name: 'speakers' })
    //     .populate('products') // only works if we pushed refs to person.eventsAttended
    //     .exec(function (err, person) {
    //         if (err) console.log(err);
    //         console.log(person);
    //     });


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

}
router.get("/xyz", async (req, res) => {
    xxx()
})





router.post('/api/addcategory', async (req, res) => {

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


// router.post('/api/editcategory', async (req, res) => {

//     const { name,subCategory,id } = req.body;
//     console.log('dd', name,subCategory )

//     //const data= JSON.parse(req.body)

//     try {
//         const result = await PRODUCT.findOneAndUpdate({ _id: id }, { $set: { name, price, description, category, image, stock } }, { new: true })
//         if (result) {
//             res.send({ isProductEdited: true })
//         } else {
//             res.send({ isProductEdited: false })
//         }
//     } catch (error) {
//         console.log(error)
//     }
// })


//seeting blogs visibility
router.post("/productvisibility", async (req, res) => {
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


///USER----
// router.post("/api/newuser", async (req, res) => {
// })
async function aaa() {


    let user = new USER({
        firstname: "dummy",
        lastname: "",
        email: "dummy@email.com",
        password: "dummy",
        phone: "9999777888",
        address: {
            house: "511",
            street: "Mapel street",
            city: "Amsterdam",
            pincode: "163301",
            state: "New Orleans",
            country: "USA",
        },
        role: "user",
        wishlist: ['64c698900ef6832aa59e93bb'],
        cart: [{
            productId: "64c68fbe2dd4e9cac1dcf1d7",
        }],
        orders: [{
            products: [{
                productId: "64c698900ef6832aa59e93bb",
                quantity: "3",
            }],
            total: 358894,
        }],

    })


    user.save()
        .then(res => console.log('ressss;d;d;d', res))

    // USER.find({})
    //     .then(res => {
    //         console.log("-3-3-", res)
    //     })

    // USER
    //     .findOne({ email: 'dummy@email.com' })
    //     .populate({
    //         path: 'wishlist',
    //         // select:
    //         //     'firstnname lastname phone',//this will return only required stuff from referred document
    //     }) // only works if we pushed refs to person.eventsAttended
    //     .exec(function (err, person) {
    //         if (err) console.log(err);
    //         console.log(person);
    //     });

}

router.get("/aaa", async (req, res) => {
    aaa()
})





//deleting blog record
router.post("/deleteblog", async (req, res) => {
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



module.exports = router;