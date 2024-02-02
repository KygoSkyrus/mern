const express = require('express');
const router = express('router');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
// const bcrypt = require('bcryptjs');

router.use(bodyParser.urlencoded({ extended: true }));//for checkout passed values
router.use(bodyParser.json())
router.use(cookieParser());
router.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf } }));
dotenv.config({ path: './env/config.env' });

const USER = require('../models/user');

const publicRoutes = require('./publicRoutes')
const adminRoutes = require('./adminRoutes')
const userRoutes = require('./userRoutes')


router.post('/api/signup', async (req, res) => {

    const { firstname, lastname, email, photo } = req.body;
    //need to handle more details when there is other method of signing up other than google
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

        res.status(200).json({ message: "Account created successfully", is_user_created: true, is_user_logged_in: true, user })

    } catch (err) {
        console.log(err);
    }
})

router.post('/api/signin', async (req, res) => {

    try {
        const { email, isAdminLogin } = req.body;

        console.log('email, isAdminLogin ',email, isAdminLogin )

        const user = await USER.findOne({ email: email }).populate('cartProducts');

        if (user) {
            if (isAdminLogin) {
                console.log('user.role !== "admin" && user.email !== process.env.ADMIN_ID--',user.role  ,user.email, process.env.ADMIN_ID)
                if ((user.role !== "admin" && user.email !== process.env.ADMIN_ID) && (user.role !== "guest" && user.email !== process.env.GUEST_USER)) {                
                    return res.status(404).json({ message: 'Access denied!!!', is_user_logged_in: false });
                } else {
                    await setCookie()                 
                    return res.status(200).json({ message: `${user.role === "guest"? 'Guest': 'Admin'} logged in successfully`, is_user_logged_in: true, user });
                }
            }
            
            async function setCookie(){
                const { token } = await user.generateAuthToken();
                res.cookie('jwt', token, {
                    expires: new Date(Date.now() + 10800000),
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                });
            }

            await setCookie()

            res.status(200).json({ message: "User logged in successfully", is_user_logged_in: true, user });
        } else {
            res.status(400).json({ message: "Account doesn't exists", is_user_logged_in: false, });
        }

    } catch (err) {
        console.log(err);
    }
})

router.use('/api', publicRoutes);
router.use('/api/user', userRoutes);
router.use('/api/admin', adminRoutes);

module.exports = router;