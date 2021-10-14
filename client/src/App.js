import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Toast, ToastContainer } from 'react-bootstrap'

import './App.css';

import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import Cart from './components/Cart';
import Orders from './components/Orders';
import itemData from './components/itemData';
import Items from './components/Items';
import Status from './components/Status';




function App() {

  const [show, setShow] = useState(false);

  const Notification = (props) => {

    //console.log(props.show);
    //console.log(props.itemName);

    if (props.show === true) {
      return (
        <>
        <ToastContainer  className="p-3 mt-5 tst">
              <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide bg="danger">
                <Toast.Header>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                  />
                  <strong className="me-auto">Shopp-itt</strong>
                  <small className="text-muted">just now</small>
                </Toast.Header>
                <Toast.Body className="text-light">{props.itemName}, has been aded to your cart.</Toast.Body>
              </Toast>
            </ToastContainer>
        </>
      );
    } else return null

  }

  const [data, setdata] = useState([]);
  const [itemName, setitemName] = useState();

  const onAdd = (a) => {
    const exist = data.find(x => x.id === a.id);
    if (exist) {
      setdata(data.map(x => x.id === a.id ? { ...exist, qty: exist.qty + 1 } : x));
    } else {
      setdata([...data, { ...a, qty: 1 }]);
    }

    setitemName(a.name);
    setShow(true);
  }

  const onRemove = (a) => {
    const exist = data.find(x => x.id === a.id);
    if (exist.qty === 1) {
      setdata(data.filter(x => x.id !== a.id));
    } else {
      setdata(data.map(x => x.id === a.id ? { ...exist, qty: exist.qty - 1 } : x));
    }
  }

  const clear = (a) => {
    a.qty = 1;
    onRemove(a);
  }


  const dl = data.length;

  return (
    <Router>
      <div className="App">
        <SignIn />

        <Navbar data={dl} />
        {/**the mess starts */}


        <Notification show={show} itemName={itemName} />

        <Route exact path="/">
          <Items onAdd={onAdd} itemData={itemData} />
        </Route>

        <Route path="/cart" component={Cart}>
          <Cart onAdd={onAdd} onRemove={onRemove} clear={clear} data={data} />
        </Route>

        {/**the mess ends */}


        <Route path="/orders" component={Orders}>
          <Orders />
        </Route>

        <Route path="/failed" component={Status}>
          <Status status={"failed"} />
        </Route>

        <Route path="/success" component={Status}>
          <Status status={"success"} />
        </Route>

      </div>
    </Router>
  );
}

export default App;
