const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
//const uuid= require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51JhvkpSJDEVNzqXluKZzqSnwF3Rh19IiwFIBZd0ZsIjErVwGb59L36Wzp2fUg3SdS7lRmoHLhbBuwrJcZ4i5B2VU00jtuNcia5');

app.use(express.static('public'));

dotenv.config({ path: './env/config.env' });

app.use(express.json());

app.use(require('./routes/route'));

//stripe
app.post('/checkout', async (req, res) => {

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
    currency: 'inr',
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



const db = process.env.dbURI;
const port = process.env.PORT || 4000;


mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('db connected');
}).catch((err) => console.log(err));



app.listen(port, () => console.log(`server is running at ${port}`));