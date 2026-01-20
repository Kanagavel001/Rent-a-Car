import express from 'express';
import { getSingleUserBookings, isUser } from '../controllers/userController.js';
import { protectUser } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.get('/is-user/:id', protectUser ,isUser);
userRouter.get('/bookings/:id', getSingleUserBookings);

export default userRouter;