const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const sk = process.env.SK;

const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(sk);

app.use(express.static('public'));

dotenv.config({ path: './env/config.env' });


app.use(require('./routes/route'));
app.use(express.json());
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

const db = process.env.dbURI;
const port = process.env.PORT || 4000;

mongoose.set('strictQuery', false);
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('db connected');
}).catch((err) => console.log(err));


if(process.env.NODE_ENV ==="production"){
  app.use(express.static("client/build"));
}


// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_5601d477da26790e09849aeeb567342bf53dbe96229fd3accbf27163f19c5476";

//there are different keys and code for webhook in prod
app.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
    const payload = request.body;
    const sig = request.headers['stripe-signature'];
    console.log("webhook api")
    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        console.log('e-', event)
    } catch (err) {
        console.log('eeeeerrrr', err)//bug here
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    console.log(`Unhandled event type ${event.type}`);
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            console.log('edatobj', event.data)
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    response.send();
});

app.listen(port, () => console.log(`server is running at ${port}`));