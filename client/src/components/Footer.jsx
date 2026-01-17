import React from 'react'
import { Facebook, Github, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Footer = () => {

    const { navigate } = useAppContext();
    
  return (
        <footer id='footer' className="flex flex-col items-center justify-center w-full py-10 bg-linear-to-bl from-secondary to-primary text-white">
            <img src="/logo.png" className='w-40' onClick={()=>{navigate('/'); scrollTo(0,0)}} />
            <p className="mt-4 text-center">Copyright © 2025 Rent a Car. All rights reservered.</p>
            <div className="flex items-center gap-4 mt-5">
                <a href="#" className="hover:-translate-y-0.5 transition-all duration-300">
                    <Facebook />
                </a>
                <a href="#" className="hover:-translate-y-0.5 transition-all duration-300">
                    <Instagram />
                </a>
                <a href="#" className="hover:-translate-y-0.5 transition-all duration-300">
                    <Linkedin />
                </a>
                <a href="#" className="hover:-translate-y-0.5 transition-all duration-300">
                        <Github />
                </a>
                <a href="#" className="hover:-translate-y-0.5 transition-all duration-300">
                        <Youtube />
                </a>
            </div>
        </footer>
    );
}

export default Footer