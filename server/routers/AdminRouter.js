import express from 'express'
import { adminDashboardData, isAdmin } from '../controllers/adminController.js';
import { protectAdmin } from '../middleware/auth.js';

const adminRouter = express.Router();

adminRouter.get(`/is-admin/:id`, protectAdmin, isAdmin);
adminRouter.get(`/dashboard`, adminDashboardData);

export default adminRouter;