import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './Components/Pages/Home'
import Navbar from './Components/Pages/Navbar'
import Cart from './Components/Pages/Cart'
import Wishlist from './Components/Pages/Wishlist'
import Store from './Components/Slice/Store'
import Auth from './Components/Pages/Auth'
import { Provider } from "react-redux"

const App = () => {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/auth' element={<Auth/>}/>
         

        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
