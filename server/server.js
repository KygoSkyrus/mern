const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const sk = process.env.SK;

const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(sk);

app.use(express.static('public'));

dotenv.config({ path: './env/config.env' });

const ORDER = require('./models/orders')
const USER = require('./models/user')
// // Use JSON parser for all non-webhook routes
// app.use((req, res, next) => {
//   if (req.originalUrl === "/webhook") {
//     next();
//   } else {
//     bodyParser.json()(req, res, next);
//   }
// });

// app.use(express.json());
// app.use((req, res, next) => {
//   if (req.originalUrl === '/webhook') {
//     next();
//   } else {
//     express.json()(req, res, next);
//   }
// });

const db = process.env.dbURI;
const port = process.env.PORT || 4000;

mongoose.set('strictQuery', false);
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('db connected');
}).catch((err) => console.log(err));


let endpointSecret;
if (process.env.NODE_ENV === "production") {
  endpointSecret = "we_1Ns5wFSJDEVNzqXlNvgt2OSL";
} else {
  // This is your Stripe CLI webhook secret for testing your endpoint locally.
  endpointSecret = "whsec_5601d477da26790e09849aeeb567342bf53dbe96229fd3accbf27163f19c5476";
}

let receiptUrl;
//cart for failing : 4000 0000 0000 0119
//there are different keys and code for webhook in prod
app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
  const payload = request.body;
  const sig = request.headers['stripe-signature'];
  console.log("--------------------------webhook starts--------------------------------------------------")
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.log('eeeeerrrr', err)//bug here
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }


  // Handle the event
  console.log(`Unhandled event type ${event.type}`);
  switch (event.type) {
    case 'charge.succeeded':
      receiptUrl = event.data.object.receipt_url
      break;
    case 'checkout.session.completed':
      const paymentIntentSucceeded = event.data.object;
      console.log('succeeded', event)
      console.log('urr', receiptUrl)
      console.log('meta s-', event.data.object.metadata)

      const metadata = event.data.object.metadata
      let order = {}
      order.orderId = metadata.orderId
      order.tax = metadata.tax
      order.shipping = metadata.shipping
      order.total = metadata.total
      order.payment_status = event.data.object.payment_status
      order.receiptUrl = receiptUrl
      order.products = []
      Object.keys(metadata).forEach(x => {
        if (
          x !== "tax" &&
          x !== "total" &&
          x !== "shipping" &&
          x !== "orderId" &&
          x !== "userId" &&
          typeof metadata[x] === "string" // Checks if the value is a string
        ) {
          let tempObj = {}
          const productData = JSON.parse(metadata[x]);
          tempObj.productId = x
          tempObj.name = productData.name
          tempObj.image = productData.image
          tempObj.quantity = productData.quantity
          tempObj.discount = productData.discount
          tempObj.price = productData.price
          order.products.push(tempObj)
        }
      })

      //saving the order details in db
      try {
        const updatedUser = await USER.findByIdAndUpdate(
          "64dca5854563a04dffe7cd9b",
          { $push: { orders: order } },
          { new: true }
        )//.populate('cartProducts');
        console.log('updateduuu', updatedUser)

      } catch (error) {
        console.error('something went wrong', error);
        res.status(500).json({ message: 'Internal server error.' });
      }

      break;
    case 'payment_intent.payment_failed':
      console.log('failed', event.data)
      console.log('meta f-', event.data.object.metadata)
      break;
    default:
      console.log('meta d-', event.data.object.metadata)
  }
  response.send();
});

//moving it affter webhook api to prevent the bodyparser to have effect from router file
app.use(require('./routes/route'));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(port, () => console.log(`server is running at ${port}`));


// let order = {
//   orderId:"",
//   products: [{
//     productId: "64c69d66c8b5667ef02f36c5",
//     name:"Redmi A2 (Sea Green, 2GB RAM, 32GB Storage)",
//     image:"	https://firebasestorage.googleapis.com/v0/b/shopp-…=media&token=fa8691b3-9d53-45a8-aced-2f92c435a379",
//     quantity: 3,
//     discount: 0,
//     price: 6000
//   }],
//   tax: 1800,
//   shipping: 0,
//   total: 19800,
// }
