import React from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Main from './pages/Main'
import Header from './components/Header'
import Wishlist from './pages/Wishlist'


export default function App() {
  return (
   <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/main' element={<Main />} />
      <Route path='/wishlist' element={<Wishlist />} />
    
    </Routes>
  </BrowserRouter>
)
}
