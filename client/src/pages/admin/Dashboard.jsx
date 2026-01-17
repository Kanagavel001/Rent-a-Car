import React from 'react'
import { BadgeIndianRupee, BookCheck, CarFront, CircleUserRound, X } from 'lucide-react'
import { dummyDashboardData } from '../../assets/assets'

const Dashboard = () => {
  return (
    <div>
      <h1 className='text-3xl max-[400px]:text-xl font-bold text-primary text-shadow-lg text-shadow-secondary title'>Dashboard</h1>

      <div className='grid gap-6 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 mx-auto w-fit py-10 max-sm:py-6'>

        <div className='w-50 h-50 text-white bg-linear-to-tl from-red-300 to-red-600 rounded-2xl flex flex-col items-center hover:scale-105 ring-2 ring-red-300 shadow-lg hover:shadow-red-300 transition-all duration-300'>
          <div className='bg-white p-3 my-3 rounded-full'>
            <CircleUserRound className='size-14 text-red-500'/>
          </div>
          
          <p className='font-medium text-xl my-3'>Users</p>
          <p className='font-bold text-2xl'>{dummyDashboardData.totalUsers}</p>
        </div>

        <div className='w-50 h-50 text-white bg-linear-to-tl from-primary/40 to-primary/90 rounded-2xl flex flex-col items-center hover:scale-105 ring-2 ring-primary/30 shadow-lg hover:shadow-primary/40 transition-all duration-300'>
           <div className='bg-white p-3 my-3 rounded-full'>
            <CarFront className='size-14 text-primary/80'/>
          </div>
          <p className='font-medium text-xl my-3'>Cars</p>
          <p className='font-bold text-2xl'>{dummyDashboardData.totalCars}</p>
        </div>

        <div className='w-50 h-50 text-white bg-linear-to-tl from-orange-300 to-orange-600 rounded-2xl flex flex-col items-center hover:scale-105 ring-2 ring-orange-300 shadow-lg hover:shadow-orange-300 transition-all duration-300'>
          <div className='bg-white p-3 my-3 rounded-full'>
            <BookCheck className='size-14 text-orange-500'/>
          </div>
          <p className='font-medium text-xl my-3'>Bookings</p>
          <p className='font-bold text-2xl'>{dummyDashboardData.totalBookings}</p>
        </div>

        <div className='w-50 h-50 text-white bg-linear-to-tl from-green-300 to-green-600 rounded-2xl flex flex-col items-center hover:scale-105 ring-2 ring-green-300 shadow-lg hover:shadow-green-300 transition-all duration-300'>
          
          <div className='bg-white p-3 my-3 rounded-full'>
            <BadgeIndianRupee className='size-14 text-green-500'/>
          </div>
          <p className='font-medium text-xl my-3'>Revenue</p>
          <p className='font-bold text-2xl'>{dummyDashboardData.totalRevenue}</p>
        </div>

      </div>
    </div>
  )
}

export default Dashboard