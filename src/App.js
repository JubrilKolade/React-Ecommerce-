import './App.css';
import Header from './common/header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pages from './pages/Pages';
import Cart from './common/cart/Cart';
import Data from './components/Data'
import Sdata from './components/shop/Sdata';
import { useState } from 'react';
import Footer from './common/footer/Footer';

function App() {
  // step 1: fetch data from database
  const { productItems } = Data
  const { shopItems } = Sdata

  const [cartItem, setCardItem] = useState([])

  const addToCart = (product) => {
    const productExit = cartItem.find((item) => item.id === product.id )

    if (productExit) {
      setCardItem(cartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty + 1 } : item)))
    } else {
      setCardItem([ ...cartItem, { ...product, qty: 1 }])
    }
  }

 const decreaseQty = (product) => {
  const productExit = cartItem.find((item) => item.id === product.id)
  if(productExit.qty === 1){
    setCardItem(cartItem.filter((item) => item.id !== product.id))
  } else {
    setCardItem(cartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - 1} : item)))
  }
 }
  
  return (
   <>
    <Router>
      <Header cartItem={cartItem}/>
      <Routes>
        <Route path='/' element = {
          <Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} />} 
        />
        <Route path='/cart' element = {
          <Cart cartItem={cartItem} addToCart={addToCart} decreaseQty={decreaseQty}/>} 
        />
      </Routes>
      <Footer />
    </Router>
  
   </>
  );
}

export default App;
