import { AirVent, Cog, Fuel, Repeat, StarIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext';

const AdminCarCard = ({car, handleChangeAvailability}) => {

    const { axios, fetchCars, notyf } = useAppContext();

    const [editPrice, setEditPrice] = useState(false);
    const [price, setPrice] = useState(car.pricePerDay);

    const handleChangePrice = async (carId) => {
        const { data } = await axios.put('/api/car/change-price', {carId, price});
        if(data.success){
            notyf.success(data.message);
        }else{
            notyf.error(data.message);
        }
        setEditPrice(false);
    }

    useEffect(()=>{
        fetchCars();
    },[handleChangePrice]);
    
  return (
    <div className='w-70 max-[450px]:w-60 bg-bg rounded-2xl group shadow-lg shadow-primary/20 ring-2 ring-secondary/10 hover:-translate-y-1 overflow-hidden transition-all duration-300'>
        <div >
        <img src={car.images[0]} alt="" className='w-full h-45 object-cover rounded-t-2xl group-hover:scale-105 transition-all duration-500' />
        </div>

        <div className='px-4 py-2 space-y-1 '>

        <div className='flex justify-between items-center'>
            <h1 className='font-semibold text-lg max-[400px]:text-sm'>{car.carName} <span className='text-sm max-[400px]:text-xs text-gray-500'>({car.carType})</span></h1>
            <div className='flex items-center gap-1 sm:text-sm text-xs'>
            <StarIcon className='fill-primary text-primary max-[400px]:w-4' size={18}/>
            <p className='font-medium'>{car.rating.toFixed(1)}</p>
            </div>
        </div>

        <div className='flex justify-between items-center'>
            <p className='font-medium text-lg max-[400px]:text-sm text-gray-500'><span className='text-lg font-bold max-[400px]:text-sm text-black'>₹ {!editPrice ? car.pricePerDay : (<input value={price} onChange={(e)=>setPrice(e.target.value)} required type='number' className='w-20 outline-none rounded-xl py-0.5 border-2 border-secondary text-sm pl-2' placeholder='price'/>)}</span> / day</p>
            <p className='font-medium max-[400px]:text-xs text-gray-500'><span className='font-semibold text-lg max-[400px]:text-sm text-black'>{car.seats}</span> Seats</p>
        </div>

        <div className='flex justify-between items-center font-medium text-sm max-[400px]:text-xs'>
            <div className='flex items-center gap-1'>
                <Cog className='w-5 max-[400px]:w-4'/>
                <p className='text-gray-500'>{car.transmission}</p>
            </div>
            <div className='flex items-center gap-1'>
                <Fuel className='w-5 max-[400px]:w-4'/>
                <p className='text-gray-500'>{car.fuelType}</p>
            </div>
            <div className='flex items-center gap-1 '>
                <AirVent className='w-5 max-[400px]:w-4'/>
                <p className='text-gray-500'>{car.AC ? "Yes" : "No"}</p>
            </div>
        </div>

        <div className='flex justify-between items-center py-2'>

            <button onClick={()=>handleChangeAvailability(car._id)} className={`flex cursor-pointer gap-2 border-2 active:scale-95 items-center rounded-full py-0.5 text-sm max-[400px]:text-xs hover:shadow-lg transition-all duration-300 ${car.availability === "Available" ? "border-green-200 px-4 hover:bg-green-200 shadow-green-300 text-green-600" : "border-red-200 px-2 text-red-600 shadow-red-300 hover:bg-red-200"}`}>{car.availability} <Repeat className='size-4 max-[400px]:size-3'/></button>

            <button onClick={editPrice ? ()=>handleChangePrice(car._id) : ()=>setEditPrice(true)} className='flex items-center font-medium text-sm bg-linear-to-bl to-primary from-secondary hover:to-secondary/60 hover:from-secondary text-white hover:text-primary hover:shadow-lg shadow-primary/50 py-1 px-4 rounded-full transition-all duration-300 gap-2 group max-[400px]:text-sm cursor-pointer'>
                {editPrice ? "Fix Price" : "Edit Price"}
            </button>
        </div>
        </div>
    </div> 
  )
}

export default AdminCarCard