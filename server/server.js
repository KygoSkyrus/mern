const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const stripe = require('stripe')('sk_test_51JhvkpSJDEVNzqXluKZzqSnwF3Rh19IiwFIBZd0ZsIjErVwGb59L36Wzp2fUg3SdS7lRmoHLhbBuwrJcZ4i5B2VU00jtuNcia5');
app.use(express.static('public'));

dotenv.config({ path: './env/config.env' });

app.use(express.json());

app.use(require('./routes/route'));


//stripe
const YOUR_DOMAIN = 'http://localhost:3000/checkout';

app.post('/create-checkout-session', async (req, res) => {
  const {amount}=req.body;
console.log(req.body.totalPrice);

  const session = await stripe.checkout.sessions.create({
    customer_email: 'jsdskdsjksdksd@gmail.com',
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
    line_items: [
      {
        price: 'price_1JhxgtSJDEVNzqXlOOdcWm3p',
        quantity: 2,
      },
    ],
    payment_method_types: [
      'card',
    ],
    mode: 'payment',
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000/failed`,
  });

  const paymentIntent = await stripe.paymentIntents.create({
  amount: 1099,
  currency: 'inr',
  payment_method_types: ['card'],
  //receipt_email: 'kygoskyrus@gmail.com',
});


  res.redirect(303, session.url)
});





const db = process.env.dbURI;
const port = process.env.PORT || 4000;


mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('db connected');
}).catch((err) => console.log(err));



app.listen(port, () => console.log(`server is running at ${port}`));