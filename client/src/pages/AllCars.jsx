import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import CarCard from '../components/CarCard'

const AllCars = () => {

  const { carTypes, cars } = useAppContext();

  const [selectedType, setSelectedType] = useState('');
  
  useEffect(()=>{
    
  }, [selectedType]);


  return (
    <div className='bg-bg max-w-screen min-h-screen overflow-x-hidden mx-auto pt-16 md:pt-20 px-4 md:px-16 lg:px-24 xl:px-32'>
      <div className='flex justify-between items-center'>

        <h1 className='font-semibold text-2xl md:text-4xl title text-primary text-shadow-lg text-shadow-secondary'>All Cars</h1>

          
        <select id="" onChange={(e)=>setSelectedType(e.target.value)} className='rounded-2xl ring-2 ring-primary/10 bg-white shadow-lg shadow-primary/10 cursor-pointer text-black/60 outline-none focus:ring transition-all duration-300 px-2 py-1'>
          <option value="" >filter by car type</option>
          <option value="" >All</option>
          { carTypes.map((item, i) => (
            <option key={i} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className='flex justify-center py-8 md:py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 md:gap-y-10 gap-x-14'>
          { selectedType ? cars.filter(car => car.carType === selectedType).map((car) => (
              <CarCard car={car} key={car._id}/>
          )) 
          : 
            cars.map((car) => (
              <CarCard car={car} key={car._id}/>
          ))
          }
        </div>
      </div>
    </div>
  )
}

export default AllCars