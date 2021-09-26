const express = require('express');
const router = express('router');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

const User=require('../models/user');



/*************routes***************/


//signup 
router.post('/signup', async (req, res) => {

    const { firstName, lastName, email, password} = req.body;

    console.log( firstName, lastName, email, password);
    if (!firstName || !lastName || !email || !password ) {
        return res.status(422).json({ error: "fill all details" });
    }
 
    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "email already exists" });
        }

        const user = new User({ firstName, lastName, email, password});

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

            const token=await userLogin.generateAuthToken();
            console.log(token);

            res.cookie('jwt',token,{
                expires:new Date(Date.now() +3600000),
                httpOnly:true
            });//not working

            if (!isMatch) {
                res.json({ error: "invalid credentials" });
            } else {
                res.json({ message: "user logged in successfully" });
            }
        } else {
            res.json({ error: "invalid or it should say that user doesnt exist--register first" });
        }

    } catch (err) {
        console.log(req.body);
    }
})


module.exports = router;