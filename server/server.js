const express = require('express');
const mongoose = require('mongoose');
const path = require("path")
const app = express();
const dotenv = require('dotenv');
const sk = process.env.SK;

const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(sk);

// app.use(express.static('public'));

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
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf } }))



// let endpointSecret;
// if (process.env.NODE_ENV === "production") {
  // let endpointSecret = "we_1Ns5wFSJDEVNzqXlNvgt2OSL";
// } else {
  // This is your Stripe CLI webhook secret for testing your endpoint locally.
  let endpointSecret = "whsec_5601d477da26790e09849aeeb567342bf53dbe96229fd3accbf27163f19c5476";
// }

let receiptUrl;
//cart for failing : 4000 0000 0000 0119
app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
  const payload = request.body;
  const sig = request.headers['stripe-signature'];
  console.log("--------------------------webhook starts--------------------------------------------------")
  let event;

  try {
    console.log('eendpointSecret',endpointSecret)
    // event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.log('eeeeerrrr', err)//bug here
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }


  // Handle the event
  console.log(`Unhandled event type ${event.type}`);
  switch (event.type) {
    case 'charge.succeeded' || "checkout.session.async_payment_succeeded":
      receiptUrl = event.data.object.receipt_url
      break;
    case 'checkout.session.completed':
      const paymentIntentSucceeded = event.data.object;
      console.log('succeeded', event)
      console.log('urr', receiptUrl)
      console.log('customer details s-', event.data.object.customer_details)

      const metadata = event.data.object.metadata
      let order = {}
      order.orderId = metadata.orderId
      order.tax = metadata.tax
      order.shipping = metadata.shipping
      order.total = metadata.total
      order.payment_status = event.data.object.payment_status
      order.receiptUrl = receiptUrl
      order.products = []
      prodArray = []
      Object.keys(metadata).forEach(x => {
        if (
          x !== "tax" && x !== "total" && x !== "shipping" && x !== "orderId" && x !== "userId" &&
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
          prodArray.push(tempObj)//for ORDER collection
        }
      })

      //saving the order details in db
      try {
        const updatedUser = await USER.findByIdAndUpdate(
          event.data.object.metadata.userId,
          { $push: { orders: order } },
          { new: true }
        )//.populate('cartProducts');
        //console.log('updateduuu', updatedUser)

        const theOrder = new ORDER({
          orderId: metadata.orderId,
          totalAmount: metadata.total,
          tax: metadata.tax,
          shipping: metadata.shipping,
          payment_status: event.data.object.payment_status,
          receiptUrl: receiptUrl,
          user: event.data.object.metadata.userId,
          products: prodArray,
          shippingAddress: event.data.object.customer_details.address,
          // paymentMethod: {
          //   enum: ['Card', 'PayPal', 'Cash on Delivery', 'Other'],
          //   default: 'Card',
          // },
        })
        console.log('orderrbfore savimg', theOrder)
        theOrder.save()
          .then(response => {
            console.log('saved order', response)
          })
          .catch(err => {
            console.log("errror---", err)
          })

      } catch (error) {
        console.error('something went wrong', error);
        res.status(500).json({ message: 'Internal server error.' });
      }

      break;
    case 'payment_intent.payment_failed':
      console.log('failed', event)
      console.log('meta f-', event.data.object.metadata)
      break;
    default:
      console.log('meta d-', event.data.object.metadata)
  }
  response.send();
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


//moving it affter webhook api to prevent the bodyparser to have effect from router file
app.use(require('./routes/route'));



app.use(express.static("client/build"));
//FOR PRODUCTION 
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/*', function (req, res) {//breaking server side
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => console.log(`server is running at ${port}`));