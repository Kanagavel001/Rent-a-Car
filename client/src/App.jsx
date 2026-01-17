import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { useUser } from '@clerk/clerk-react';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AllCars from './pages/AllCars'
import CarDetails from './pages/CarDetails'
import MyBooking from './pages/MyBooking';
import Layout from './components/admin/Layout';
import Dashboard from './pages/admin/Dashboard';
import Cars from './pages/admin/Cars';
import Bookings from './pages/admin/Bookings';
import ScrollToTop from './components/ScrollToTop ';

const App = () => {

  const isLoginPage = useLocation().pathname.startsWith('/login');
  const isAdminPage = useLocation().pathname.startsWith('/admin')

  return (
    <div>
      <ScrollToTop />
      {!isLoginPage && !isAdminPage && <Navbar />}
      <Routes>
        <Route path='/' element={ <Home /> }/>
        <Route path='/login' element={<Login />}/>
        <Route path='/cars' element={<AllCars />}/>
        <Route path='/car/:id' element={<CarDetails />}/>
        <Route path='/my-bookings' element={<MyBooking />}/>
        <Route path='/admin/*' element={<Layout />}>
          <Route index element={<Dashboard />}/>
          <Route path='cars' element={<Cars />}/>
          <Route path='bookings' element={<Bookings />}/>
        </Route>
      </Routes>
      {!isLoginPage && !isAdminPage && <Footer />}
    </div>
  )
}

export default App