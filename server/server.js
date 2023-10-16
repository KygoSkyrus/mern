const express = require('express');
const mongoose = require('mongoose');
const path = require("path")
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './env/config.env' });
const sk = process.env.SK;
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')


const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(sk);

app.use(express.static('public'));

dotenv.config({ path: './env/config.env' });

const ORDER = require('./models/orders')
const USER = require('./models/user')
const PRODUCT = require('./models/product')
const CATEGORY = require('./models/category')
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

// app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf } }))

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


app.use(bodyParser.urlencoded({ extended: true }));//for checkout passed values
app.use((req, res, next) => {
    if (req.originalUrl === "/webhook") {
        next();
    } else {
        bodyParser.json()(req, res, next);
    }
});
const cookieParser = require('cookie-parser');
app.use(cookieParser());
//from route
app.post('/api/signin', async (req, res) => {

  try {
      const { email } = req.body;

      // if (!email || !password) {
      //     return res.status(400).json({ error: "fill all details" });
      // }

      const user = await USER.findOne({ email: email }).populate('cartProducts');

      if (user) {
          // const isMatch = await bcrypt.compare(password, userLogin.password);

          const token = await user.generateAuthToken();
          //console.log(token);

          res.cookie('jwt', token, {
              expires: new Date(Date.now() + 10800000),
              httpOnly: true
          });
          res.cookie('email', email, {
              expires: new Date(Date.now() + 10800000),
              httpOnly: true
          });

          res.status(200).json({ message: "User logged in successfully", is_user_logged_in: true, user });//send the user data alsong with the message
          // if (!isMatch) {
          //     res.status(400).json({ error: "invalid credentials" });
          // } else {
          // }
      } else {
          res.status(400).json({ message: "Account doesn't exists", is_user_logged_in: false, });
      }

  } catch (err) {
      console.log(err);
  }
})
app.get('/api/getorders', async (req, res) => {

  // const { orderId } = req.query
  const token = req.cookies.jwt;

  // console.log('orderId', orderId)
  //thi is common for most user actions ,so create a middleware function instead
  if (!token) {
      return res.status(401).json({ message: 'Session expired', is_user_logged_in: false });
  }
  try {
      const decoded = jwt.verify(token, process.env.SECRETKEY);


      USER.findOne({ _id: decoded._id }, { orders: 1, _id: 0 })// to just get a specific field from a document
          .then(response => {
              // console.log('sss', response)
              res.send({ user: response })
          })
          .catch(err => {
              console.log(err)
          })

  } catch (error) {
      console.error('Error getting items from wishlist', error);
      res.status(500).json({ message: 'Internal server error.' });
  }

})
app.post('/create-checkout-session', async (req, res) => {


  let line_items = []
  const token = req.cookies.jwt;
  const orderId = uuidv4()
  let productList = {}//for metadata


  //thi is common for most user actions ,so create a middleware function instead
  if (!token) {
      return res.status(401).json({ message: 'Session expired', is_user_logged_in: false });
  }
  try {
      const decoded = jwt.verify(token, process.env.SECRETKEY);//for user id

      const data = JSON.parse(req.body.priceObj)
      //meta data has 5 keys for orders details and rest 45 for products
      productList.orderId = orderId
      productList.userId = decoded._id
      productList.tax = data.tax
      productList.shipping = data.shipping
      productList.total = data.grandTotal


      Object.keys(data.productList).forEach(x => {
          let prod = {}

          prod.price_data = {}
          prod.price_data.currency = "inr"
          prod.price_data.product_data = {}
          prod.price_data.product_data.name = data.productList[x].name
          if (data.grandTotal < 999999) {
              prod.price_data.unit_amount = data.productList[x].price * 100
          } else {
              prod.price_data.unit_amount = data.productList[x].price
          }
          prod.quantity = data.productList[x].quantity

          prod.adjustable_quantity = {}
          prod.adjustable_quantity.enabled = true
          prod.adjustable_quantity.minimum = 1
          prod.adjustable_quantity.maximum = 300

          //for metadata
          productList[x] = {}
          productList[x].name = data.productList[x].name
          productList[x].image = data.productList[x].image
          productList[x].price = data.productList[x].price
          productList[x].quantity = data.productList[x].quantity
          productList[x].discount = data.productList[x].discount
          productList[x] = JSON.stringify(productList[x])//metadata only supports key value(only string) that's why its stringified

          line_items.push(prod)
      })

      //console.log('productList', productList)


  } catch (err) {
      console.log('er', err);
  }

  const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      payment_method_types: ['card'],
      success_url: process.env.NODE_ENV === "production"?`https://shoppitt.onrender.com/orders/${orderId}`:`http://localhost:3006/orders/${orderId}`,
      cancel_url: process.env.NODE_ENV === "production"?`https://shoppitt.onrender.com/user`:'http://localhost:3006/user',
      customer_email: req.cookies.email,
      metadata: productList,
      billing_address_collection:"required",
      // total_details:{
      //     amount_discount:443,
      //     amount_tax:33
      // }
      //shipping_address_collection:"required"
  });


  res.redirect(303, session.url);//redirects to checkout page
});
app.get('/api/getUserInfo', async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
      return res.status(401).json({ message: 'Session expired', is_user_logged_in: false });
  }
  //cookie timezone is fucked up,,
  // console.log(new Date(Date.now() + 3600000))
  try {
      const decoded = jwt.verify(token, process.env.SECRETKEY);
      //console.log('decoded', decoded)
      // Check if the token is expired


      //populating with regular populate which can cause performnace overhead
      // const user = await USER.findById(decoded._id)
      //     .populate('cart.productId')
      //   .populate('wishlist.productId');

      //by mongoose virtual
      const user = await USER.findById(decoded._id).populate('cartProducts');
      //console.log(user)
      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }

      // Token is valid, user is signed in
      res.status(200).json({ message: 'Access granted.', is_user_logged_in: true, user });
  } catch (error) {
      // Invalid token
      console.log(error)
      res.status(401).json({ message: 'Invalid token.', is_user_logged_in: false });
  }
});


//moving it affter webhook api to prevent the bodyparser to have effect from router file
// app.use(require('./routes/route'));

app.use(express.static("client/build"));
//FOR PRODUCTION 
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/*', function (req, res) {//breaking server side
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => console.log(`server is running at ${port}`));
