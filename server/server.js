const express = require('express');
const mongoose = require('mongoose');
const path = require("path")
const app = express();
const dotenv = require('dotenv');
var cors = require('cors')

dotenv.config({ path: './env/config.env' });
app.use(express.json());

var corsOptions = {
  origin: 'https://shoppitt.onrender.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

const db = process.env.dbURI;
const port = process.env.PORT || 4000;

mongoose.set('strictQuery', false);
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('db connected');
}).catch((err) => console.log(err));


app.use(require('./routes/route'));
app.use(express.static("client/build"));
//FOR PRODUCTION 
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => console.log(`server is running at ${port}`));