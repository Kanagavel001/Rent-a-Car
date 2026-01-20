import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react'
import notyf from '../components/Notyf';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const navigate = useNavigate();
    const { user } = useUser();
    const { getToken } = useAuth();
    const [cars, setCars] = useState([]);
    const [isUser, setIsUser] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [bookingCount, setBookingCount] = useState({
        confirmed: "",
        ongoing: "",
        completed: "",
        cancelled: "",
    });

    const carTypes = ["Hatchback", "Sedan", "SUV", "Luxury", "Electric"]

    const fetchIsUser = async (userId) => {
        const { data } = await axios.get(`/api/user/is-user/${userId}`)
        if(data.success){
            setIsUser(true);
        }else{
            notyf.success(data.message)
        }
    }

    const fetchCars = async () => {
        const { data } = await axios.get('/api/car/get-all');
        if(data.success){
            setCars(data.cars)
        }
    }

    const fetechBookings = async () => {
        const { data } = await axios.get('/api/booking/get-all');

        if(data.success){
            setBookings(data.bookings);
            setBookingCount({
                confirmed: data.confirmedCount,
                 ongoing: data.ongoingCount, 
                 completed: data.completedCount, 
                 cancelled: data.cancelledCount
            })
        }
    }

    useEffect(()=>{
        fetchCars();
        fetechBookings();
    }, []);

    useEffect(()=>{
        if(user){
            fetchIsUser(user.id);
        }
    }, [user])

    const value = { axios, user, isUser, getToken, navigate, carTypes, cars, setCars, fetchCars, notyf, bookings, bookingCount, fetechBookings }

    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);