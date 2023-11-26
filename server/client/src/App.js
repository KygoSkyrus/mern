import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Toast, ToastContainer } from 'react-bootstrap'

import { initializeApp } from 'firebase/app';

import './assets/css/App.css';
import './assets/css/v2.css'

import SignIn from './components/v2/SignIn'
// import Cart from './components/oldcomp/Cart';
// import Orders from './components/Orders'; 
// import itemData from './components/itemData';
// import Items from './components/Items';
// import Success from './components/Success';
// import Failed from './components/Failed'
import Admin from './components/v2/Admin';
import TheFront from './components/v2/TheFront';

import Toast from './components/v2/Toast';
import AdminLogin from './components/v2/Admin/AdminLogin';

function App() {


  //FIREBASE_________________________________
const firebaseConfig = {
  apiKey: "AIzaSyD356cys4X2N0DHboL4T8MZCDR1BuN2n88",
  authDomain: "shopp-itt.firebaseapp.com",
  projectId: "shopp-itt",
  storageBucket: "shopp-itt.appspot.com",
  messagingSenderId: "500784370915",
  appId: "1:500784370915:web:5433a992ab3e3229daa1d6",
  measurementId: "G-DVFRLB25DQ"
};
const firebaseApp = initializeApp(firebaseConfig);
  //FIREBASE_________________________________


  const [show, setShow] = useState(false);

  // const Notification = (props) => {
  //   //console.log(props.show);
  //   //console.log(props.itemName);
  //   if (props.show === true) {
  //     return (
  //       <>
  //         <ToastContainer className="p-3 mt-5 tst">
  //           <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide bg="danger" >
  //             <Toast.Header>
  //               <img
  //                 src=""
  //                 className="rounded me-2"
  //                 alt=""
  //               />
  //               <strong className="me-auto">Shopp-itt</strong>
  //               <small className="text-muted">just now</small>
  //             </Toast.Header>
  //             <Toast.Body className="text-light">{props.itemName}, has been aded to your cart.</Toast.Body>
  //           </Toast>
  //         </ToastContainer>
  //       </>
  //     );
  //   } else return null
  // }

  const [data, setdata] = useState([]);
  const [itemName, setitemName] = useState();

  //to add the item to cart
  const onAdd = (a) => {
    const exist = data.find(x => x.id === a.id);//it will check if the item clicked is already there, it is then it will increase the quantity otherwise it will add it to cart
    if (exist) {
      setdata(data.map(x => x.id === a.id ? { ...exist, qty: exist.qty + 1 } : x));
    } else {
      setdata([...data, { ...a, qty: 1 }]);
    }

    //to show toast only on the main page but not on the cart
    if (window.location.href === "http://localhost:3000/") {
      setitemName(a.name);//this is for the toast, to show name of the product
      setShow(true);//related to toast
    }

  }

  //to decrease the item from cart
  const onRemove = (a) => {
    const exist = data.find(x => x.id === a.id);
    if (exist.qty === 1) {
      setdata(data.filter(x => x.id !== a.id));
    } else {
      setdata(data.map(x => x.id === a.id ? { ...exist, qty: exist.qty - 1 } : x));
    }
  }

  //to delete the item from cart
  const clear = (a) => {
    a.qty = 1;
    onRemove(a);
  }

  const [cartData, setcartData] = useState();
  const [tPrice, settPrice] = useState();
  //callback function to cart to get the data from there and send to orders
  const callbck = (data, totalprice) => {
    setcartData(data);
    settPrice(totalprice);
  }

  const dl = data.length;//no.of items cart has

  return (
    <BrowserRouter>
      <div className="App">
        <SignIn firebaseApp={firebaseApp} />

        <Toast />


        <Routes>
          <Route path="/*" exact element={<TheFront />} />
          <Route path="/admin/*" exact element={<Admin firebaseApp={firebaseApp} />} />
          <Route exact path='/login' element={<AdminLogin/>}/>
        </Routes>


      </div>
    </BrowserRouter>
  );
}

export default App;
