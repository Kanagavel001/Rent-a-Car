import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { AirVent, ArrowRight, CalendarDays, Cog, Fuel, MapPin, StarIcon } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppContext } from '../context/AppContext';

const CarDetails = () => {

  const { id } = useParams();
  const [ car, setCar] = useState({});
  const [mainImage, setMainImage] = useState(null);
  const [ fromDate, setFromDate] = useState('');
  const [ toDate, setToDate] = useState('');

  const { cars } = useAppContext();

  const fetchcar = async (id) => {
    const car = cars.find(vehicle => vehicle._id === id)
    car && setCar(car)
    car && setMainImage(car.images[0])
  }

  useEffect(()=>{
    fetchcar(id);
  },[id]);

  return car && (
    <div className='bg-bg max-w-screen min-h-screen overflow-x-hidden mx-auto pt-18 pb-4 md:pt-22 px-4 md:px-16 lg:px-24 xl:px-32'>

      <div className='flex justify-between items-center'>

        <h1 className='text-2xl md:text-4xl font-bold title text-primary text-shadow-lg text-shadow-secondary'>{car.carName} <span className='text-sm font-semibold text-primary text-shadow-none'>({car.carType})</span></h1>

        <button className='bg-linear-to-bl to-primary from-secondary hover:to-secondary/60 hover:from-secondary text-white hover:text-primary hover:shadow-lg shadow-primary/50 transition-all duration-300 flex px-4 rounded-full gap-1.5 hover:scale-105 active:scale-95 py-2 max-[450px]:py-1 group cursor-pointer'>
            Book Now 
            <div className='group-hover:translate-x-1 transition-all duration-300'>
                <ArrowRight />
            </div>
        </button>
      </div>

      <div className='flex lg:flex-row flex-col items-center mt-6 lg:mt-8 gap-6'>
        <div className='rounded-2xl overflow-hidden lg:w-1/2 w-full shadow-lg shadow-primary/20 ring-2 ring-primary/10'>
          <img src={mainImage} alt="" className='w-full h-70 sm:h-90 object-cover rounded-2xl hover:scale-105 transition-all duration-300' />
        </div>
        <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
          {Array.isArray(car?.images) && car.images.map((image, i) => (
            <div key={i} className={`overflow-hidden rounded-2xl shadow-lg transition-all duration-300 ${image === mainImage && "shadow-primary/20 ring-2 ring-primary/10"}`}>
              <img className='w-full sm:h-40 h-30 object-cover rounded-2xl hover:scale-105 transition-all duration-300' onClick={()=>(setMainImage(image))} src={image} alt="" />
            </div>
          ))}
        </div>
      </div>

      <div className='lg:flex items-center justify-between mt-6 space-y-6'>

        <div className='flex-1 flex items-center justify-around text-center'>
          <div className='space-y-3'>
            <h1 className='text-2xl max-[400px]:text-lg font-bold'>₹ {car.pricePerDay} <span className='text-lg max-[400px]:text-sm font-medium'>/ day</span></h1>
            <p className='text-xl font-bold'>{car.seats} <span className='font-medium text-lg'>Seats</span></p>
            <p className='flex items-center justify-center gap-1 max-[400px]:text-sm font-medium'><StarIcon className='fill-secondary w-5 text-secondary max-[400px]:w-4'/> <span >{car.rating}</span></p>
          </div>

          <div className='space-y-3'>
            <h1 className='mx-auto w-fit flex items-center gap-2 max-[400px]:text-sm font-medium'><Cog className='w-5 sm:w-6'/> Transmission :  <span className='max-[400px]:text-sm font-bold'>{car.transmission}</span></h1>
            <p className='mx-auto w-fit flex items-center gap-2 max-[400px]:text-sm font-medium'><Fuel className='w-5 sm:w-6'/> Fuel type : <span className='max-[400px]:text-sm font-bold'>{car.fuelType}</span></p>
            <p className='mx-auto w-fit flex items-center gap-2 max-[400px]:text-sm font-medium'><AirVent className='w-5 sm:w-6'/> AC : <span className='max-[400px]:text-sm font-bold'>{car.AC ? "Yes" : "No"}</span></p>
          </div>
        </div>

        <div className=' bg-secondary/20 border-2 border-primary/5 shadow-lg shadow-primary/20 rounded-2xl p-4 space-y-4 xl:w-1/2'>

          <div className='flex justify-between items-center'>
            <label htmlFor='from' className='flex lg:py-2 py-1 px-4 rounded-2xl ring-2 ring-primary/10 bg-white shadow-lg shadow-primary/20'>
              <DatePicker
                className='w-30 sm:w-40 outline-none font-medium'
                id='from'
                dateFormat={"dd/MM/yyyy"}
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
                placeholderText="Pickup date"
                minDate={new Date()}
              />
              <CalendarDays />
            </label>
            <label htmlFor='to' className='flex lg:py-2 py-1 px-4 rounded-2xl ring-2 ring-primary/10 bg-white shadow-lg shadow-primary/20'>
              <DatePicker
                className='w-30 sm:w-40 outline-none font-medium'
                id='to'
                dateFormat={"dd/MM/yyyy"}
                selected={toDate}
                onChange={(date) => setToDate(date)}
                placeholderText="Return date"
                minDate={fromDate}
              />
              <CalendarDays />
            </label>
          </div>

          <div className='flex items-center justify-between'>

            <label htmlFor="location" className='relative flex lg:py-2 py-1 px-4 rounded-2xl ring-2 ring-primary/10 bg-white shadow-lg shadow-primary/20 outline-none w-44 sm:w-54'>
              <MapPin className='absolute right-4'/>
              <input type="text" id='location' className='outline-none' placeholder='your city' />
            </label>

            <button className='bg-linear-to-bl to-primary from-secondary hover:to-secondary/60 hover:from-secondary text-white hover:text-primary hover:shadow-lg shadow-primary/50 transition-all duration-300 px-4 rounded-2xl hover:scale-105 active:scale-95 sm:py-2 w-45 sm:w-55 py-1 cursor-pointer '>
              Check Availability
            </button>

          </div>
          
        </div>
      </div>
      
    </div>
  )
}

export default CarDetails