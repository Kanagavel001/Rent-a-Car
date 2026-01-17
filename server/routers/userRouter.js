import express from 'express';
import { isUser } from '../controllers/userController.js';
import { protectUser } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.get('/is-user', isUser);

export default userRouter;