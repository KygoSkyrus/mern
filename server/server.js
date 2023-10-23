const Stripe = require('stripe');
const express = require('express');
const mongoose = require('mongoose');
const path = require("path")
const dotenv = require('dotenv');


const port = process.env.PORT || 5000;

dotenv.config({ path: './env/config.env' });
const stripe = new Stripe(process.env.sk, {
  apiVersion: '2023-08-16',
});

const webhookSecret = "we_1Ns5wFSJDEVNzqXlNvgt2OSL";

const app = express();

// Use JSON parser for all non-webhook routes
app.use(
  (
    req,
    res,
    next
  ) => {
    if (req.originalUrl === '/webhook') {
      next();
    } else {
      express.json()(req, res, next);
    }
  }
);

const db = process.env.dbURI;

mongoose.set('strictQuery', false);
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('db connected');
}).catch((err) => console.log(err));



app.post(
  '/webhook',
  // Stripe requires the raw body to construct the event
  express.raw({ type: 'application/json' }),
  (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      console.log('e', event)
    } catch (err) {
      // On error, log and return the error message
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Successfully constructed event
    console.log('✅ Success:', event.id);

    // Cast event data to Stripe object
    if (event.type === 'payment_intent.succeeded') {
      const stripeObject = event.data.object;
      console.log(`💰 PaymentIntent status: ${stripeObject.status}`);
    } else if (event.type === 'charge.succeeded') {
      const charge = event.data.object;
      console.log(`💵 Charge id: ${charge.id}`);
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
);

app.use(require('./routes/route'));

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/*', function (req, res) {//breaking server side
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


app.listen(port, () => console.log(`server is running at ${port}`));




