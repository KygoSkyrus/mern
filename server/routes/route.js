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


/************* SCHEMA ***************/
const PRODUCT = require('../models/product')



/*************routes***************/

//signup 
router.post('/signup', async (req, res) => {

    const { firstName, lastName, email, password } = req.body;

    //console.log(firstName, lastName, email, password);

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

        //console.log(userLogin);

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();
            //console.log(token);

            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true
            });
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
        .then(response=>{
            // console.log(response)
            res.send(response)
        })
        .catch(error=>{
            console.log(error)
            res.send({error:error})
        })

})



router.post('/api/addproducts', async (req, res) => {

    const {name,price,description,category,image,stock} = req.body;
    console.log('dd',name,price,description,category,image,stock)

    //const data= JSON.parse(req.body)

    console.log("data :>",req.body )

    const product = new PRODUCT({
        name:name,
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

    const {name,price,description,category,image,stock,id} = req.body;
    console.log('dd',name,price,description,category,image,stock,id)

    //const data= JSON.parse(req.body)

try{
    const result =await PRODUCT.findOneAndUpdate({_id:id}, { $set: { name,price,description,category,image,stock } },{ new: true })
    if (result) {
        res.send({ isProductEdited: true })
      } else {
        res.send({ isProductEdited: false })
      }
    }catch(error){
        console.log(error)
    }
})



//seeting blogs visibility
router.post("/productVisibility", async (req, res) => {
    const details = req.body;
  
    try {
      //findByIdAndUpdate: is the alternatice to directly use id
      let result = await BLOG.findOneAndUpdate({ _id: details.id }, { status: details.val }, { new: true })
      if (result) {
        res.send({ isSet: true })
      } else {
        res.send({ isSet: false })
      }
    } catch (err) {
      console.log(err);
    }
  });


  //deleting blog record
router.post("/deleteblog", async (req, res) => {
    const details = req.body;
  
    try {
      let result = await BLOG.deleteOne({ _id: details.id })
      if(result.deletedCount>0){
        res.send({ isDeleted: true });
        console.log('result',result)
      }
    } catch (err) {
      console.log(err);
    }
  });



module.exports = router;