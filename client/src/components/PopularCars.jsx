import React from 'react'
import CarCard from './CarCard'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const PopularCars = () => {

  const { cars } = useAppContext();
  return (
    <div className='max-w-screen bg-bg mx-auto overflow-x-hidden px-4 md:px-16 lg:px-20 xl:px-24 sm:py-15 py-10'>
      <h1 data-aos="fade-up" className='title text-4xl max-[400px]:text-2xl font-bold text-center text-primary text-shadow-lg text-shadow-secondary'>Popular Cars</h1>

        <div className='grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1-4 gap-6 mt-10 sm:mt-15 mx-auto w-fit'>
        {cars.map((car, i) => (i <= 3) && (
          <CarCard car={car} key={car._id} aos={i%2 === 0 ? "fade-left" : "fade-right"}/>
        ))}
      </div>

      <div data-aos="zoom-in">
        <Link  to={'/cars'} className='flex items-center mx-auto text-sm font-medium bg-linear-to-bl to-primary from-secondary hover:to-secondary/60 hover:from-secondary text-white hover:text-primary hover:shadow-lg shadow-primary/50 sm:py-2 sm:px-6 py-1 px-4 rounded-full transition-all duration-500 gap-2 group mt-10 hover:scale-105 active:scale-95 w-fit'>
            View All
            <div className='group-hover:translate-x-1 transition-all duration-300'>
                <ArrowRight />
            </div>
        </Link>
      </div>
    </div>
  )
}

export default PopularCars