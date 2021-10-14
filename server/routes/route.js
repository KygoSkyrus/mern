const express = require('express');
const router = express('router');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser');
router.use(cookieParser());

const User = require('../models/user');

const dotenv = require('dotenv');
dotenv.config({ path: './env/config.env' });
const sk = process.env.SK;

const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(sk);

/*************routes***************/


//signup 
router.post('/signup', async (req, res) => {

    const { firstName, lastName, email, password } = req.body;

    console.log(firstName, lastName, email, password);

    if (!firstName || !lastName || !email || !password) {
        return res.status(422).json({ error: "fill all details" });
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "email already exists" });
        }

        const user = new User({ firstName, lastName, email, password });

        //hashing password

        await user.save();

        res.status(201).json({ message: "user register successfully" })

    } catch (err) {
        console.log(err);
    }
})



//signin
router.post('/signin', async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "fill all details" });
        }

        const userLogin = await User.findOne({ email: email });

        console.log(userLogin);

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true
            });//not working
            res.cookie('email', email, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({ error: "invalid credentials" });
            } else {
                res.status(400).json({ message: "user logged in successfully" });
            }
        } else {
            res.status(200).json({ error: "account doesn't exists" });
        }

    } catch (err) {
        console.log(req.body);
    }
})

//stripe
router.post('/checkout', async (req, res) => {

    const { totalPrice, token } = req.body;
    console.log("prdouct :", totalPrice);
    console.log("token :", token);
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

});


/*
router.get('/exist', (req, res) => {

    let token = req.cookies.jwt;
    console.log('Cookies: ', token);
    if (token) {
        res.status(200).json({ message: "exist" });
    } else {
        res.status(400).json({ error: "not exists" });
    }
    res.status(200).json({ message: "exist" });
});
*/
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
        console.log(req.body);
    }

});

router.post('/getemail', async (req, res) => {

    try {
        let email = req.cookies.email;
        //console.log("email:", email);
        res.send(JSON.stringify(email));
    } catch (err) {
        console.log(req.body);
    }

});


module.exports = router;