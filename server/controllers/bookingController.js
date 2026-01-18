import stripe from 'stripe'
import Booking from '../models/Booking.js';

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

        console.log(booking)

        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        const line_items = [{
            price_data: {
                currency: 'IND',
                product_data: {
                    name: carName
                },
                unit_amount: Math.floor(booking.amount) * 100
            },
            quantity: 1
        }]

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-bookings`,
            cancel_url: `${origin}/loading/my-bookings`,
            line_items,
            mode: 'payment',
            metadata: {
                bookingId: booking._id.toString()
            },
            expires_at: Math.floor(Date.now() /1000) + 60 * 60 * 24, // Expires in 24 hours
        })

        booking.paymentLink = session.url;
        await booking.save();

        res.json({success: true, url: session.url });
    } catch (error) {
        res.json({success: false, message: error.message});
        console.log(`createBooking Error ${error.message}`)
    }
}