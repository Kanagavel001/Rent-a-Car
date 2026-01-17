import React from 'react'
import { dummybookings } from '../../assets/assets'

const Bookings = () => {

  return (
    <div >

        <h1 className='text-3xl max-[400px]:text-xl font-bold text-primary text-shadow-lg text-shadow-secondary title max-md:text-center'>Bookings</h1>

        <div className='grid grid-cols-4 max-md:grid-cols-2 w-fit mx-auto gap-x-4 gap-y-2 text-white text-sm max-[400px]:text-xs font-medium mt-4 text-center'>
            <p className='bg-secondary px-4 py-1 rounded-full'>Confirmed : 4</p>
            <p className='bg-orange-600 px-4 py-1 rounded-full'>Ongoing : 4</p>
            <p className='bg-green-600 px-4 py-1 rounded-full'>Completed : 4</p>
            <p className='bg-red-600 px-4 py-1 rounded-full'>Cancelled : 4</p>
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
            {dummybookings.map((booking) => (
              <tr key={booking._id} className='odd:bg-secondary/10 text-center text-sm max-md:text-xs border-b border-secondary'>
                <td className='py-8'><p>{booking.user}</p></td>
                <td >
                  <p>{booking.car[0].carName}</p>
                  <p>{booking.car[0].carType}</p>
                </td>
                <td className='max-lg:hidden'>
                  <p>{booking.location}</p>
                  <p>{booking.pickupDate}</p>
                </td>
                <td className='max-lg:hidden'>
                  <p>{booking.duration}</p>
                  <p>{booking.returnDate}</p>
                </td>
                <td className='space-y-2'>
                  <p>₹ {booking.price}</p>
                  <p className={`border ${booking.status === "Cancelled" && "hidden"} rounded-full mx-auto w-20 max-[400px]:w-15 py-0.5 ${booking.paid ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"}`}>{booking.paid ? "Paid" : "Pending"}</p>
                </td>
                <td className='space-y-2'>
                  <p className={`rounded-full mx-auto py-0.5 w-27 max-[400px]:w-22 text-white ${booking.status === "Ongoing" ? "bg-orange-500 " : booking.status === "Cancelled" ? "bg-red-500" : booking.status === "Confirmed" ? "bg-secondary" : "hidden"}`}>{booking.status}</p>

                  <button className={`font-medium cursor-pointer rounded-full w-27 max-[400px]:w-22 mx-auto py-1 ${booking.status === "Cancelled" ? "hidden" : booking.status === "Confirmed" ? "hidden" : booking.status === "Completed" ? "bg-green-600 text-white" : "bg-linear-to-bl to-primary from-secondary hover:to-secondary/60 hover:from-secondary text-white hover:text-primary shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"}`}>{booking.status === "Completed" ? "Completed" : "Complete" }</button>
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