import express from 'express'
import { checkAvailability, createBooking } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post('/create', createBooking);
bookingRouter.post('/check-availability', checkAvailability);

export default bookingRouter;