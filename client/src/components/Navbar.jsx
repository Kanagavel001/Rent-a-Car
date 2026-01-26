import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import { Menu, TicketPlus, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Cars', path: '/cars' },
        { name: 'Contact', path: '/' },
        { name: 'Admin', path: '/admin' },
    ];

    const location = useLocation();
    const { user, navigate } = useAppContext();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {

        if(location.pathname !== '/'){
            setIsScrolled(true);
            return;
        }else{
            setIsScrolled(false);
        }
        setIsScrolled(prev => location.pathname !== '/' ? true : prev);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <nav className={`fixed top-0 left-0 bg-transparent w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-primary shadow-md backdrop-blur-lg py-3 md:py-4" : "bg-primary py-4 md:py-6"}`}>

        {/* Logo */}
        <Link to={'/'} className="flex items-center gap-2">
            <img src={'/logo.png'} className='w-25 md:w-30' />
        </Link>

        {/* Desktop Right */}
        <div className='flex items-center gap-8'>
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => (
                    <Link key={i} to={link.path} className={`group font-medium flex flex-col gap-0.5 bg-linear-to-tr to-primary from-secondary hover:to-secondary/60 hover:from-secondary rounded-full py-1 px-4 text-sm  text-white hover:shadow-lg shadow-secondary/50 hover:text-primary hover:scale-103 transition-all duration-300${isScrolled ? "" : ""}`}>
                        {link.name}
                    </Link>
                ))}
            </div>
        
            <div className="hidden md:flex items-center gap-4">
                { user ?
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label='My Bookings' labelIcon={<TicketPlus width={15}/>} onClick={()=>navigate('/my-bookings')} />
                        </UserButton.MenuItems>
                    </UserButton>
                : 
                    <button onClick={()=>navigate('/login')} className={`bg-linear-to-tr to-primary from-secondary hover:to-secondary/60 hover:from-secondary rounded-full py-2 px-8 text-white hover:shadow-lg shadow-secondary/50 hover:text-primary hover:scale-105 active:scale-95 transition-all duration-300`}>
                        Login
                    </button>
                }
            </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden text-primary">
            {user ? <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label='My Bookings' labelIcon={<TicketPlus width={15}/>} onClick={()=>navigate('/my-bookings')} />
                        </UserButton.MenuItems>
                    </UserButton>
            : 
            <button onClick={()=>navigate('/login')} className="bg-linear-to-tr to-primary from-secondary hover:to-secondary/60 hover:from-secondary rounded-full py-1 px-6 text-sm text-white hover:shadow-lg shadow-secondary/50 hover:text-primary hover:scale-105 active:scale-95 transition-all duration-300">
                Login
            </button>
            }
            <Menu onClick={()=>setIsMenuOpen(true)} />
        </div>

        {/* Mobile Menu */}
        <div className={`fixed top-0 right-0 bg-transparent text-base flex flex-col md:hidden gap-6 font-medium transition-all duration-500 p-3 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
            

            <div onInvalidCapture={()=>setIsMenuOpen(false)} className='flex flex-col gap-y-5 text-center bg-bg p-8 rounded-xl ring-2 ring-secondary/10 shadow-lg shadow-primary/20 relative w-fit'>
            <button className="absolute top-2 right-2 text-primary" onClick={() => setIsMenuOpen(false)}>
                <X />
            </button>
                {navLinks.map((link, i) => (
                    <Link className='text-primary bg-white px-4 py-2 shadow-inner rounded-xl shadow-primary/30 text-sm' key={i} to={link.path} onClick={() => setIsMenuOpen(false)}>
                        {link.name}
                    </Link>
                ))}
            </div>
        </div>
    </nav>
  )
}

export default Navbar