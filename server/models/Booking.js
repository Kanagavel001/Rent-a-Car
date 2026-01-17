import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
        user: {type: String, ref: 'User', required: true},
        car: {type: Object, ref: 'Car', required: true},
        pickupDate: {type: String, required: true},
        returnDate: {type: String, required: true},
        duration: {type: Number},
        location: {type: String, required: true},
        price: {type: Number, required: true},
        paid: {type: Boolean, default: false},
        status: {type: String, default: "Confirmed", enum: ["Confirmed", "Ongoing", "Completed", "Cancelled"]},
        paymentLink: {type: String}
}, {timestamps: true});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;