import stripe from 'stripe'
import Booking from '../models/Booking.js';
import Car from '../models/Car.js';
import mongoose from "mongoose";

export const createBooking = async (req, res) => {
    try {
        
        const bookingData = req.body;
        const { origin } = req.headers;

        const { 
            user,
            pickupDate,
            returnDate,
            location,
            price,
            car,
            carName
        } = bookingData;

        const startDate = new Date(pickupDate);
        const endDate = new Date(returnDate);

        const duration = Math.ceil(
            (endDate - startDate) / (1000 * 60 * 60 * 24)
        )

        const booking = await Booking.create({
            user,
            pickupDate,
            returnDate,
            location,
            price,
            car,
            duration
        })

        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        const line_items = [{
            price_data: {
                currency: 'inr',
                product_data: {
                    name: carName
                },
                unit_amount: Math.floor(booking.price) * 100
            },
            quantity: 1
        }]

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/my-bookings`,
            cancel_url: `${origin}/my-bookings`,
            line_items,
            mode: 'payment',
            metadata: {
                bookingId: booking._id.toString()
            },
            expires_at: Math.floor(Date.now() /1000) + 60 * 60 * 23, // Expires in 23 hours
        })

        booking.paymentLink = session.url;
        await booking.save();

        res.json({success: true, url: session.url, message: `${carName} is Booked Successfully` });
    } catch (error) {
        res.json({success: false, message: error.message});
        console.log(`createBooking ${error}`)
    }
}


export const checkAvailability = async (req, res) => {
    try {
        const carData = req.body;
        const { returnDate, pickupDate, id } = carData;
        const car = await Car.findById(id);

        if(!car){
            return res.json({success: false, message: `Car not found`});
        }

        if(car.availability === 'Maintenance'){
            return res.json({success: false, message: `${car.carName} in Maintenance`});
        }

        const newPickupDate = new Date(pickupDate);
        const newReturnDate = new Date(returnDate);

        const alreadyBooked = await Booking.findOne({
            car: new mongoose.Types.ObjectId(id),
            status: { $ne: "Cancelled" },
            pickupDate: { $lt: newReturnDate },
            returnDate: { $gt: newPickupDate }
        });

        if(alreadyBooked){
            return res.json({success: false, message: `${car.carName} already booked for selected dates`})
        }

        res.json({success: true, message: `${car.carName} is available`})

    } catch (error) {
        res.json({success: false, message: error.message});
        console.log(`checkAvailability ${error}`)
    }
} 