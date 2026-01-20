import React, { useEffect, useState } from 'react'
import AdminCarCard from '../../components/admin/AdminCarCard'
import { Plus } from 'lucide-react'
import AddCar from '../../components/admin/AddCar'
import { useAppContext } from '../../context/AppContext'

const Cars = () => {

  const { cars, axios, fetchCars, notyf } = useAppContext();

  const [addCar, setAddCar] = useState(false);
  const [available, setAvailable] = useState('');
  const [maintenance, setMaintenance] = useState('');

  const fetchCarsAvailabilityCount = async () => {
    const { data } = await axios.get('/api/car/availability-count');
    if(data.success){
      setAvailable(data.available);
      setMaintenance(data.maintenance);
    }
  }

  const handleChangeAvailability = async (carId) => {
      const { data } = await axios.put('/api/car/change-availability', {carId});
      if(data.success){
          notyf.success(data.message);
      }else{
          notyf.error(data.message);
      }
  }

  useEffect(()=>{
    fetchCars();
    fetchCarsAvailabilityCount();
  }, [handleChangeAvailability]);

  return (
    <div>

      {addCar && <AddCar setAddCar={setAddCar}/>}

      <div className='flex justify-between items-center py-2'>

        <h1 className='text-3xl max-[400px]:text-xl font-bold text-primary text-shadow-lg text-shadow-secondary title'>Cars List</h1>

        <div className='flex max-lg:hidden items-center gap-4'>
          <p className='text-sm font-medium bg-green-200 text-green-600 px-4 py-1 rounded-full'>Available : {available}</p>
          <p className='text-sm font-medium bg-red-200 text-red-600 px-4 py-1 rounded-full'>Maintenance : {maintenance}</p>
        </div>

        <button onClick={()=>setAddCar(true)} className='flex items-center font-medium bg-linear-to-bl to-primary from-secondary hover:to-secondary/60 hover:from-secondary text-white hover:text-primary hover:shadow-lg shadow-primary/50 py-1 px-4 rounded-full transition-all duration-300 gap-1 max-[400px]:text-sm cursor-pointer '>
          <Plus /> Add Car
        </button>

      </div>
      
        <div className='h-150 overflow-auto no-scrollbar'>
          <div className='grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-8 mt-5 mx-auto w-fit pb-5'>
            {cars.map((car) => (
              <AdminCarCard car={car} key={car._id} handleChangeAvailability={handleChangeAvailability}/>
            ))}
          </div>
        </div>
    </div>
  )
}

export default Cars