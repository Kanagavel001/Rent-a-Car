import Booking from "../models/Booking.js";

export const isUser = async (req, res) => {
    res.json({success: true});
}

export const getSingleUserBookings = async (req, res) => {
    try {

        const { id } = req.params; 
        const bookings = await Booking.find({user: id}).populate('car').sort({createdAt: -1});
        res.json({ success: true, bookings});

    } catch (error) {
        res.json({success: false, message: error.message});
        console.log('getSingleUserBookings', error.message);
    }
}