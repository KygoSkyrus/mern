const express = require('express');
const mongoose = require('mongoose');
const path = require("path")
const app = express();
const dotenv = require('dotenv');

dotenv.config({ path: './env/config.env' });
app.use(express.json());

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