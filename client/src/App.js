import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';

import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import Cart from './components/Cart';
import Orders from './components/Orders';
import itemData from './components/itemData';
import Items from './components/Items';




function App() {
//console.log(itemData);

//const [cartItems, setcartItems] = useState([]);



  const [data, setdata] = useState([]);

  const onAdd = (a) => {
    const exist =data.find(x=>x.id===a.id);
    if(exist){
      setdata(data.map(x=>x.id===a.id ? {...exist, qty:exist.qty +1}:x));
    }else{
      setdata([ ...data, {...a, qty:1} ]);
    }
    
    //alert(`${a.name}, added to cart`);
  }

  const onRemove=(a)=>{
    const exist =data.find(x=>x.id===a.id);
    if(exist.qty===1){
      setdata(data.filter(x=>x.id !== a.id ));
    }else{ 
      setdata(data.map(x=> x.id===a.id ?{...exist, qty:exist.qty -1} : x ));
    }
  }

  const clear=(a)=>{
    a.qty=1;
    onRemove(a);
  }


 const dl=data.length;

  return (
    <Router>
      <div className="App">
        <SignIn />

        <Navbar data={dl}/>
        {/**the mess starts */}
        
        <Route exact path="/">
         <Items onAdd={onAdd} itemData={itemData}/>
        </Route>

        <Route path="/cart" component={Cart}>
          <Cart onAdd={onAdd} onRemove={onRemove} clear={clear} data={data} />
        </Route>

        {/**the mess ends */}


        <Route path="/orders" component={Orders}>
          <Orders />
        </Route>


      </div>
    </Router>
  );
}

export default App;
