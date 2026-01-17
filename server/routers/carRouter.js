import express from 'express';
import { addCar, changeAvailability, changePrice, getCars, getCarsAvailabilityCount } from '../controllers/carController.js';
import upload from '../middleware/uploadMiddleware.js';

const carRouter = express.Router();

carRouter.post('/add', upload.array("images", 4), addCar);
carRouter.get('/get-all', getCars);
carRouter.put('/change-price', changePrice);
carRouter.put('/change-availability', changeAvailability);
carRouter.get('/availability-count', getCarsAvailabilityCount);

export default carRouter;