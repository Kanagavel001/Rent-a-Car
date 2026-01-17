import { v2 as cloudinary } from 'cloudinary';
import Car from '../models/Car.js';

export const addCar = async (req, res) => {
    try {
        const { carData } = req.body;
        const { carName, carType, seats, pricePerDay, fuelType, transmission, AC  } = JSON.parse(carData);

        const uploadImages = req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path);
            return response.secure_url;
        })

        const images = await Promise.all(uploadImages);

        await Car.create({
            carName,
            carType,
            seats,
            pricePerDay,
            images,
            fuelType,
            transmission,
            AC
        })

        res.json({success: true, message: "Car added successfully"});

    } catch (error) {
        res.json({success: false, message: error.message});
        console.log(`addCar Error ${error.message}`)
    }
}

export const getCars = async (req, res) => {
    try {
        const cars = await Car.find({});
        res.json({success: true, cars});
    } catch (error) {
        res.json({success: false, message: error.message});
        console.log(`getCars Error ${error.message}`)
    }
}

export const changePrice = async (req, res) => {
    try {
        const { carId, price } = req.body;
        const car = await Car.findByIdAndUpdate(carId, {pricePerDay: price});

        if(!car) return res.json({ success: false, message: "Car not found"});

        res.json({success: true, message: `${car.carName} price changed successfully`});
    } catch (error) {
        res.json({success: false, message: error.message});
        console.log(`changePrice Error ${error.message}`)
    }
}

export const changeAvailability = async (req, res) => {
    try {
        const { carId } = req.body;

        const car = await Car.findById(carId);

        if(!car) return res.json({ success: false, message: "Car not found Available"});
        
        car.availability = car.availability === "Maintenance" ? "Available" : "Maintenance";

        await car.save();

        res.json({success: true, message: `Car is ${car.availability}`});
    } catch (error) {
        res.json({success: false, message: error.message});
        console.log(`changeAvailability Error ${error.message}`)
    }
}


export const getCarsAvailabilityCount = async (req, res) => {
    try {
        const available = await Car.countDocuments({availability: "Available"});
        const maintenance = await Car.countDocuments({availability: "Maintenance"})
        res.json({success: true, available, maintenance});
    } catch (error) {
        res.json({success: false, message: error.message});
        console.log(`getCarsAvailabilityCount Error ${error.message}`)
    }
}