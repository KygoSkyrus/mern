import express, {} from 'express';
import { connect } from 'mongoose';
const app = express();
import { config } from 'dotenv';


app.use(express.static('public'));

config({ path: './env/config.env' });

app.use(json());

app.use(require('./routes/route'));

 

const db = process.env.dbURI;
const port = process.env.PORT || 4000;


connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('db connected');
}).catch((err) => console.log(err));


if(process.env.NODE_ENV ==="production"){
  app.use(express.static("client/build"));
}


app.listen(port, () => console.log(`server is running at ${port}`));