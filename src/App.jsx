import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './Components/Pages/Home'
import Navbar from './Components/Pages/Navbar'
import Cart from './Components/Pages/Cart'
import Store from './Components/Slice/Store'
import {Provider} from "react-redux"
import Wishlist from '../../Addtocart/src/Components/Pages/Wishlist'
const App = () => {
  
  return (
    <div>
    <Provider store={Store}>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart/>} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App