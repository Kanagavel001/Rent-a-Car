import React from 'react'
import { BookCheck, CarFront, LayoutDashboard } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const SideNavbar = () => {

    const { navigate } = useAppContext()

    const navLinks = [
        {title: "Dashboard", icon: LayoutDashboard , path: "/admin"},
        {title: "Cars", icon: CarFront, path: "/admin/cars"},
        {title: "Bookings", icon: BookCheck, path: "/admin/bookings"}
    ]
  return (
    <div className='h-screen max-md:h-full flex justify-center max-md:p-2 p-6 max-md:mt-2'>

        <div className='w-60 max-md:w-full max-md:flex max-md:justify-between max-md:items-center rounded-3xl bg-bg shadow-lg shadow-primary/20 ring-2 ring-secondary/10 max-md:px-4'>

            <div className='flex flex-col items-center gap-2 pt-4 max-md:hidden'>
                <h1 className='text-3xl font-bold title text-secondary text-shadow-lg text-shadow-primary '>Admin</h1>
                <img onClick={()=>navigate('/admin')} src="/logo.png" className='w-35 cursor-pointer' />
            </div>

            <div className='max-md:flex justify-center mt-3 max-md:mt-0  hidden gap-4'>
                <img onClick={()=>navigate('/admin')} src="/rent_car.png" className='size-8 cursor-pointer' alt="" />
                <h1 className='text-2xl font-bold title text-secondary text-shadow-lg text-shadow-primary'>Admin</h1>
            </div>

            <div className='mt-10 max-md:my-2 space-y-2 max-md:space-y-0 max-md:flex items-center'>
                {navLinks.map((link, i) => (
                    <NavLink end key={i} to={link.path} className={({isActive}) => ` flex p-2 pl-4 max-md:p-2 mx-2 items-center gap-3 rounded-xl transition-all duration-300 font-medium cursor-pointer ${isActive ? " text-secondary bg-white shadow-inner shadow-primary/20" : "hover:bg-secondary/20"}`}>
                        {({isActive}) => (
                            <>
                                <link.icon className='max-[400px]:w-5' />
                                <h3 className={`text-lg max-md:hidden`}>{link.title}</h3>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
        
    </div>
  )
}

export default SideNavbar