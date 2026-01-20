import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import User from "../models/User.js";


export const isAdmin = async (req, res) => {
    res.json({success: true})
}

export const adminDashboardData = async (req, res) => {
    try {
        const usercount = await User.countDocuments()
        const carCount = await Car.countDocuments();
        const bookingCount = await Booking.countDocuments();
        const bookings = await Booking.find({paid: true});

        const dashboardData = {
            usercount,
            carCount,
            bookingCount,
            revenue: bookings.reduce((acc, booking) => acc + booking.price, 0)
        }

        res.json({success: true, dashboardData})

    } catch (error) {
        res.json({success: false, message: error.message});
        console.log(`adminDashboardData ${error}`);
    }
}