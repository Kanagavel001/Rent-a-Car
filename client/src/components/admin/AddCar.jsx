import { ImagePlus, X } from 'lucide-react';
import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext';


const AddCar = ({setAddCar}) => {

    const { axios, notyf } = useAppContext();

    const [carName, setCarName] = useState('');
    const [carType, setCarType] = useState('');
    const [pricePerDay, setPricePerDay] = useState('');
    const [seats, setSeats] = useState('');
    const [transmission, setTransmission] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [AC, setAC] = useState('');
    const [images, setImages] = useState({
        1: null,
        2: null,
        3: null,
        4: null,
    });

    const handleAddCar = async (e) => {
        e.preventDefault();
        try {
            const carData = {
                carName, carType, pricePerDay, seats, transmission, fuelType, AC
            }

            const formData = new FormData();
            formData.append("carData", JSON.stringify(carData))

            Object.keys(images).forEach((key) => {
                images[key] && formData.append("images", images[key])
            })

            const { data } = await axios.post('/api/car/add', formData);
            if(data.success){
                notyf.success(data.message)
                setCarName('');
                setCarType('');
                setPricePerDay('');
                setSeats('');
                setTransmission('');
                setFuelType('');
                setAC('')
                setImages({
                    1: null,
                    2: null,
                    3: null,
                    4: null,
                })
                setAddCar(false)
            }
        } catch (error) {
            notyf.error(error.message)
        }
    }


  return (
    <div className='fixed top-0 left-0 z-50 bg-white w-screen h-screen mx-auto overflow-x-hidden flex items-center justify-center'>
        
        <div className='bg-bg h-3/4 max-[400px]:w-80 ring-2 ring-secondary/10 rounded-2xl shadow-lg shadow-primary/20 py-6'>

            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-2xl max-[400px]:text-xl text-primary text-shadow-lg text-shadow-secondary title px-4'>Add a Car</h1>
                <X onClick={()=>setAddCar(false)} className='mr-6 active:scale-95 text-primary transition-all duration-300 cursor-pointer ' strokeWidth={3}/>
            </div>
            

            <form onSubmit={handleAddCar} className=' relative'>
                <div className='flex justify-between items-center mt-8 max-[400px]:px-2 px-8 gap-8'>
                    <input required type="text" value={carName} onChange={(e)=>setCarName(e.target.value)} className='max-[400px]:w-30 bg-secondary/20 ring-2 ring-secondary/20 shadow-lg shadow-primary/15 rounded-lg outline-none pl-3 p-1.5' placeholder='car name...'/>
                    <input required type="text" value={carType} onChange={(e)=>setCarType(e.target.value)} className='max-[400px]:w-30 bg-secondary/20 ring-2 ring-secondary/20 shadow-lg shadow-primary/15 rounded-lg outline-none pl-3 p-1.5' placeholder='car type...'/>
                </div>

                <div className='flex justify-between items-center mt-8 max-[400px]:px-2 px-8 gap-8'>
                    <input required type="number" value={pricePerDay} onChange={(e)=>setPricePerDay(e.target.value)} className='max-[400px]:w-30 bg-secondary/20 ring-2 ring-secondary/20 shadow-lg shadow-primary/15 rounded-lg outline-none pl-3 p-1.5' placeholder='price per day...'/>
                    <input required type="number" value={seats} onChange={(e)=>setSeats(e.target.value)} className='max-[400px]:w-30 bg-secondary/20 ring-2 ring-secondary/20 shadow-lg shadow-primary/15 rounded-lg outline-none pl-3 p-1.5' placeholder='seat count...'/>
                </div>

                <div className='flex justify-between items-center mt-8 max-[400px]:px-0 px-8 max-[400px]:text-sm'>
                    <select required value={transmission} onChange={(e)=>setTransmission(e.target.value)} className='bg-secondary/20 ring-2 ring-secondary/20 shadow-lg shadow-primary/15 rounded-lg outline-none p-1.5'>
                        <option value="" disabled>transmission...</option>
                        <option value="Manual">Manual</option>
                        <option value="Automatic">Automatic</option>
                    </select>

                    <select required value={fuelType} onChange={(e)=>setFuelType(e.target.value)} className='bg-secondary/20 ring-2 ring-secondary/20 shadow-lg shadow-primary/15 rounded-lg outline-none p-1.5'>
                        <option value="" disabled>fuel type...</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                    </select>

                    <select required value={AC} onChange={(e)=>setAC(e.target.value)} className='bg-secondary/20 ring-2 ring-secondary/20 shadow-lg shadow-primary/15 rounded-lg outline-none p-1.5'>
                        <option value="" disabled>AC...</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>

                <div className='mt-8 px-8 flex flex-col items-center h-20'>

                        <div className='flex gap-2 font-medium'>
                            <ImagePlus />
                            <p>add 4 images</p>
                        </div>
                    
                        <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap mx-auto mt-4'>
                            {Object.keys(images).map((key) => (
                                <label htmlFor={`roomImages${key}`} key={key}>
                                <img src={images[key] ? URL.createObjectURL(images[key]) : '/uploadArea.svg' } alt="" className='max-h-13 cursor-pointer opacity-80' />
                                <input type="file" accept='image/*' id={`roomImages${key}`} hidden onChange={ e => setImages({...images, [key]: e.target.files[0]})} />
                                </label>
                            ))}
                        </div>
                    
                </div>

                <div className='flex items-center justify-center mt-6 sm:mt-0 relative'>
                    <button type='submit' className='w-40 -bottom-30 absolute font-medium bg-linear-to-bl to-primary from-secondary hover:to-secondary/60 hover:from-secondary text-white hover:text-primary hover:shadow-lg shadow-primary/50 py-3 rounded-full transition-all duration-300 gap-1 max-[400px]:text-sm cursor-pointer'>Submit</button>
                </div>
                
            </form>

        </div>

    </div>
  )
}

export default AddCar