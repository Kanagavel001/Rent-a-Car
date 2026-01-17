import React from 'react'
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col justify-end max-w-screen h-screen bg-bg mx-auto overflow-x-hidden px-4 md:px-16 lg:px-24 xl:px-32 bg-[url(hero_bg.png)] bg-center bg-cover'>

        <div className='flex flex-col items-start pb-4 gap-2'>
            <h1 className='title md:text-4xl text-3xl max-[400px]:text-2xl font-bold text-primary text-shadow-lg text-shadow-secondary'>Rent the Perfect Car for Every Journey</h1>
            <p className='text-sm text-gray-300 md:w-2xl'>Choose from a wide range of well maintained vehicles at affordable prices. Quick booking, transparent pricing and 24/7 support wherever you go.</p>
        </div>
        
        <div className='flex flex-col lg:items-center items-end mb-10 '>
            <Link to={'/cars'} className='flex items-center max-[400px]:text-sm gap-1 bg-linear-to-tr to-primary from-secondary hover:to-secondary/60 hover:from-secondary hover:scale-105 hover:text-primary text-white shadow-lg hover:shadow-primary/80 active:scale-100 md:py-3 py-1.5 md:px-6 px-4 font-medium rounded-full transition-all duration-300 group cursor-pointer'>Explore Cars <ArrowRight className='group-hover:translate-x-1 transition-all duration-300'/></Link>
        </div>
        
    </div>
  )
}

export default Hero