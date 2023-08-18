const express = require('express');
const router = express('router');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser');
router.use(cookieParser());

const USER = require('../models/user');

const dotenv = require('dotenv');
dotenv.config({ path: './env/config.env' });
const sk = process.env.SK;

const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(sk);


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
        console.log('decoded', decoded)
        // Check if the token is expired

        //this can be avoided as the expiry time is set on cookies
        // if (decoded.exp <= Date.now() / 1000) {
        //     return res.status(401).json({ message: 'Token has expired.', is_user_logged_in: false });
        // }

        const user = await USER.findOne({ _id: decoded._id });
        console.log(user)
        // Token is valid, user is signed in
        res.json({ message: 'Access granted.', is_user_logged_in: true, user });//do the thing here...get theuser from db from the user id decoded from token
    } catch (error) {
        // Invalid token
        res.status(401).json({ message: 'Invalid token.', is_user_logged_in: false });
    }
});


router.get('/api/signmeout', async (req, res) => {

    res.clearCookie('jwt')
    res.clearCookie('email')
    res.send({ message: "User logged out!!!" })

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
            return res.status(422).json({ message: "User already exists!!! Try signing in instead", is_user_created: false });
        }

        const user = new USER({ firstname: firstname, lastname: lastname, email: email, avtar: photo });

        //hashing password

        const response = await user.save();
        console.log('dddd', response)

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

        res.status(201).json({ message: "Account created successfully", is_user_created: true, user: response })//send the user data

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

        const user = await USER.findOne({ email: email });

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
            console.log('sss', response)
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
            console.log('sss', response)
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

    const { name, price, description, category, image, stock, id } = req.body;
    console.log('dd', name, price, description, category, image, stock, id)

    //const data= JSON.parse(req.body)

    try {
        const result = await PRODUCT.findOneAndUpdate({ _id: id }, { $set: { name, price, description, category, image, stock } }, { new: true })
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



router.post('/api/getcartitems', async (req, res) => {

    const { user } = req.body;
    console.log('user', user)
    USER.findOne({ email: user })
        .populate('cart.productId') // only works if we pushed refs to person.eventsAttended
        .exec(function (err, person) {
            if (err) console.log(err);
            console.log(person);
        });

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