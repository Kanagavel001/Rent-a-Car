import React from 'react'
import { dummybookings } from '../assets/assets'
import { Armchair } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyBookings = () => {

  const { axios, notyf, user } = useAppContext();

  const [ bookings, setBookings] = useState([]);

  const fetchUserBookings = async (id) => {
    const { data } = await axios.get(`/api/user/bookings/${id}`);

    if(data.success){
      setBookings(data.bookings);
    }else{
      notyf.error(data.message)
    }
  }

  useEffect(()=>{
    if(user){
      fetchUserBookings(user.id)
    }
  }, [user])

  return (
    <div className='bg-bg max-w-screen min-h-screen overflow-x-hidden mx-auto pt-16 pb-4 md:pt-20 px-4 md:px-16 lg:px-24 xl:px-32'>

      <h1 className='text-3xl max-[450px]:text-xl font-bold text-primary text-shadow-lg text-shadow-secondary title'>My Bookings</h1>

      <div className='max-h-145 overflow-y-auto my-8 max-md:my-5 shadow-lg shadow-primary/20 ring-2 ring-secondary/10 rounded-2xl mx-auto no-scrollbar xl:w-4xl lg:w-3xl'>
        {bookings.map((booking) => (
          <div key={booking._id} className='flex items-center justify-between max-[450px]:flex-col gap-2   bg-white border-b border-primary p-4 max-[450px]:p-2'>

            <div className='flex items-center max-[450px]:justify-between w-full gap-4'>
              <div>
                <img src={booking.car.images[0]} className='w-40 max-[450px]:w-30  rounded-2xl' alt="" />
              </div>

              <div className='space-y-1'>
                <p className='font-bold max-[450px]:text-sm'>{booking.car.carName} <span className='text-xs font-medium text-gray-400'>({booking.car.carType})</span></p>
                <div className='flex items-center gap-5'>
                  <p className='flex items-center gap-1 max-[450px]:text-xs'><Armchair className='size-5 max-[450px]:w-4'/>{booking.car.seats}</p>
                  <p className='text-sm max-[450px]:text-xs'>₹ <span className='font-bold'>{booking.car.pricePerDay}</span> / day</p>
                </div>
                <div className='md:flex gap-4'>
                  <p className='text-sm font-medium'>Pickup : <span className='text-xs text-gray-400'>{booking.pickupDate}</span></p>
                  <p className='text-sm font-medium'>Return : <span className='text-xs text-gray-400'>{booking.returnDate}</span></p>
                </div>
              </div>
            </div>

            <div className='space-y-2 text-center max-[450px]:flex items-center justify-between max-[450px]:w-full max-[450px]:px-4'>
                <p className='font-bold'>₹ {booking.price}</p>
                <Link to={!booking.paid && booking.paymentLink} className={`font-medium w-20 py-1 px-4 rounded-full transition-all duration-300 text-white max-[450px]:text-sm  ${booking.paid ? "bg-green-600" : "cursor-pointer bg-linear-to-bl to-primary from-secondary hover:to-secondary/60 hover:from-secondary hover:text-primary hover:shadow-lg shadow-primary/50 hover:scale-105 active:scale-95"}`}>{booking.paid ? "Paid" : "Pay"}</Link>
            </div>


          </div>
        ))}
      </div>
    </div>
  )
}

export default MyBookings