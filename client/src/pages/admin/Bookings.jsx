import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import moment from 'moment'

const Bookings = () => {

  const { bookings, bookingCount, axios, notyf, fetechBookings, isAdmin } = useAppContext();

  const [selectedBookings, setSelectedBookings] = useState([]);
  const [select, setSelect] = useState('Confirmed');

  const selectBooking = async (selected) => {
    setSelect(selected)
    setSelectedBookings(bookings.filter(booking => booking.status === selected))
  }

  const handleTakeCarBooking = async (bookingId) => {

    if(!isAdmin){
        return notyf.error('Admin only access');
    }

    const { data } = await axios.put(`/api/booking/ongoing/${bookingId}`);
    if(data.success){
      notyf.success(data.message);
      fetechBookings();
    }else{
      notyf.error(data.message)
    }
  }

  const handleCompleteBooking = async (bookingId) => {
    
    if(!isAdmin){
        return notyf.error('Admin only access');
    }

    const { data } = await axios.put(`/api/booking/complete/${bookingId}`)
    if(data.success){
      notyf.success(data.message);
      fetechBookings();
    }else{
      notyf.error(data.message)
    }
  }

  useEffect(()=>{
    if (bookings?.length) {
      selectBooking(select)
    }
  }, [bookings]);

  return (
    <div >

        <h1 className='text-3xl max-[400px]:text-xl font-bold text-primary text-shadow-lg text-shadow-secondary title max-md:text-center'>Bookings</h1>

        <div className='grid grid-cols-4 max-md:grid-cols-2 w-fit mx-auto gap-x-4 gap-y-2 text-white text-sm max-[400px]:text-xs font-medium mt-4 text-center'>
            <button onClick={()=>selectBooking('Confirmed')} className='bg-secondary hover:bg-secondary/90 transition duration-300 hover:scale-103 active:scale-97 px-4 py-1 rounded-full shadow-lg shadow-primary/30'>Confirmed : {bookingCount.confirmed}</button>
            <button onClick={()=>selectBooking('Ongoing')} className='bg-yellow-400 hover:bg-yellow-300 transition duration-300 hover:scale-103 active:scale-97 px-4 py-1 rounded-full shadow-lg shadow-primary/30'>Ongoing : {bookingCount.ongoing}</button>
            <button onClick={()=>selectBooking('Completed')} className='bg-green-600 hover:bg-green-500 transition duration-300 hover:scale-103 active:scale-97 px-4 py-1 rounded-full shadow-lg shadow-primary/30'>Completed : {bookingCount.completed}</button>
            <button onClick={()=>selectBooking('Cancelled')} className='bg-red-600 hover:bg-red-500 transition duration-300 hover:scale-103 active:scale-97 px-4 py-1 rounded-full shadow-lg shadow-primary/30'>Cancelled : {bookingCount.cancelled}</button>
        </div>

      <div className='w-fit h-135 overflow-y-auto mt-6 max-md:mt-3 shadow-lg shadow-primary/20 ring-2 ring-secondary/10 rounded-2xl mx-auto no-scrollbar'>
        <table className='xl:w-4xl lg:w-2xl md:w-100 w-100 max-[400px]:w-80'>
          <thead className='bg-primary sticky top-0 z-10 text-white max-md:text-sm'>
            <tr className=''>
              <th className='py-4 w-fit'>User Name</th>
              <th >Car Name</th>
              <th className='max-lg:hidden'>Pickup</th>
              <th className='max-lg:hidden'>Duration & Return</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {selectedBookings.map((booking) => (
              <tr key={booking._id} className='odd:bg-secondary/10 text-center text-sm max-md:text-xs border-b border-secondary'>
                <td className='py-8'><p>{booking.user.name}</p></td>
                <td >
                  <p>{booking.car.carName}</p>
                  <p>{booking.car.carType}</p>
                </td>
                <td className='max-lg:hidden'>
                  <p>{booking.location}</p>
                  <p>{moment(booking.pickupDate).format('DD MMM yyyy')}</p>
                </td>
                <td className='max-lg:hidden'>
                  <p>{booking.duration} days</p>
                  <p>{moment(booking.returnDate).format('DD MMM yyyy')}</p>
                </td>
                <td className='space-y-2'>
                  <p>₹ {booking.price}</p>
                  <p className={`border ${booking.status === "Cancelled" && "hidden"} rounded-full mx-auto w-20 max-[400px]:w-15 py-0.5 ${booking.paid ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"}`}>{booking.paid ? "Paid" : "Pending"}</p>
                </td>
                <td className='space-y-2'>
                  <p className={`rounded-full mx-auto py-1 w-27 max-[400px]:w-22 text-white ${booking.status === "Ongoing" ? "bg-yellow-400" : booking.status === "Cancelled" ? "bg-red-500" : booking.status === "Confirmed" ? "bg-secondary" : "bg-green-600 text-white"}`}>{booking.status}</p>

                  <button onClick={()=> booking.status === 'Confirmed' ?  handleTakeCarBooking(booking._id) : handleCompleteBooking(booking._id)} className={`font-medium rounded-full w-27 max-[400px]:w-22 mx-auto py-1 ${booking.status === "Cancelled" ? "hidden" : booking.status === "Completed" ? "hidden" : "bg-linear-to-bl to-primary from-secondary hover:to-secondary/60 hover:from-secondary text-white cursor-pointer hover:text-primary shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"}`}>{booking.status === "Completed" ? "Completed" : booking.status === "Confirmed" ? "Take a car" : "Complete" }</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Bookings