import { ArrowRight, StarIcon } from 'lucide-react'
import React from 'react'
import { useAppContext } from '../context/AppContext'

const CarCard = ({car}) => {

    const {navigate} = useAppContext()

  return (
    <div onClick={()=>navigate(`/car/${car._id}`)} className='sm:w-75 w-70 rounded-2xl group ring-2 ring-secondary/10 overflow-hidden shadow-lg shadow-primary/10 hover:shadow-primary/30 transition-all duration-300 cursor-pointer'>
        <div>
        <img src={car.images[0]} alt="" className='w-full h-45 object-cover rounded-t-2xl group-hover:scale-105 transition-all duration-500' />
        </div>

        <div className='p-4 bg-white space-y-1'>

        <div className='flex justify-between items-center'>
            <h1 className='font-semibold sm:text-lg'>{car.carName} <span className='text-xs sm:text-sm text-gray-600'>({car.carType})</span></h1>
            <div className='flex items-center gap-1 text-sm'>
            <StarIcon className='fill-primary text-primary w-4'/>
            <p className='font-medium'>{car.rating.toFixed(1)}</p>
            </div>
        </div>

        <div className='flex justify-between items-center'>
            
            <p className='font-medium sm:text-lg text-sm text-gray-600'><span className='sm:text-xl text-lg font-bold text-black'>₹ {car.pricePerDay}</span> / day</p>
            <p className='font-medium max-sm:text-sm'><span className='font-semibold sm:text-lg'>{car.seats}</span> Seats</p>
            
        </div>

        <div className='flex justify-between items-center pt-2'>

            <p className={`rounded-full px-4 py-0.5 text-xs sm:text-sm ${car.availability === "Available" ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"}`}>{car.availability}</p>

            <button className='flex items-center text-sm font-medium bg-linear-to-bl to-primary from-secondary group-hover:to-secondary/60 group-hover:from-secondary text-white group-hover:text-primary group-hover:shadow-lg shadow-primary/50 py-1 px-3 rounded-full transition-all duration-500 gap-1 group'>
                View Details 
                <div className='group-hover:translate-x-1 transition-all duration-300'>
                    <ArrowRight className='size-5' />
                </div>
            </button>
        </div>
        </div>
    </div> 
  )
}

export default CarCard