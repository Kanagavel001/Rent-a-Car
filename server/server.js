import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.js';
import carRouter from './routers/carRouter.js';
import connectCloudinary from './configs/cloudinary.js';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import userRouter from './routers/userRouter.js';
import { stripeWebhooks } from './controllers/stripeWebhooks.js';

const app = express();

connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware())

app.get('/', (req, res) => res.send("Server is Live!"));
app.use('/api/stripe', express.raw({type: 'application/json'}), stripeWebhooks);
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use('/api/car', carRouter);
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));