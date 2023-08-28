const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');

app.use(express.static('public'));

dotenv.config({ path: './env/config.env' });

app.use(express.json());

// // Use JSON parser for all non-webhook routes
// app.use((req, res, next) => {
//   if (req.originalUrl === "/webhook") {
//     next();
//   } else {
//     bodyParser.json()(req, res, next);
//   }
// });
 
app.use(require('./routes/route'));

 

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


app.listen(port, () => console.log(`server is running at ${port}`));