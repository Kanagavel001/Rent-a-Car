import express from 'express'
import { checkAvailability, createBooking, getAllBookings, handleCancel, handleComplete, handleOngoing } from '../controllers/bookingController.js';
import { protectUser } from '../middleware/auth.js';

const bookingRouter = express.Router();

bookingRouter.post('/create', createBooking);
bookingRouter.post('/check-availability', checkAvailability);
bookingRouter.get('/get-all', getAllBookings);
bookingRouter.put('/ongoing/:id', handleOngoing);
bookingRouter.put('/complete/:id', handleComplete);
bookingRouter.put('/cancel/:id', handleCancel)

export default bookingRouter;