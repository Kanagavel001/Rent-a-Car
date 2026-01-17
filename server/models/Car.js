import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    carName: {type: String, required: true},
    carType: {type: String, required: true},
    seats: {type: Number, required: true},
    pricePerDay: {type: Number, required: true},
    images: [{type: String}],
    fuelType: {type: String, required: true, enum: ["Petrol", "Diesel", "Electric"]},
    transmission: {type: String, required: true, enum: ["Manual", "Automatic"]},
    AC: {type: Boolean, required: true},
    rating: {type: Number, default: 4.5},
    availability: {type: String, default: "Available", enum: ["Available", "Maintenance"]}
})

const Car = mongoose.model('Car', carSchema);

export default Car;