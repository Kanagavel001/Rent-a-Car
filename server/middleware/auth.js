import User from "../models/User.js";
import { getAuth } from '@clerk/express'


export const protectUser = async (req, res, next) => {
    try {
         const { userId } = req.auth() || '';
         console.log(userId)
        if (!userId) {
            return res.json({ success: false, message: "Not authenticated" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        req.user = user;
        
        next();
    } catch (error) {
        res.json({success: false, message: error.message});
        console.log(`protectUser error ${error.message}`)
    }
}