import React from 'react'
import SideNavbar from './SideNavbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex max-md:flex-col'>
        <SideNavbar />
        <div className='flex-1 px-4 py-10 max-md:py-0 md:px-10 h-screen overflow-y-auto'>
            <Outlet />
        </div>
    </div>
  )
}

export default Layout