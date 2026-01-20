import User from "../models/User.js";

export const protectUser = async (req, res, next) => {
    try {

        const { id } = req.params;
        if (!id) {
            return res.json({ success: false, message: "Not authenticated" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        next();
    } catch (error) {
        res.json({success: false, message: error.message});
        console.log(`protectUser error ${error.message}`)
    }
}


export const protectAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.json({ success: false, message: "Not authenticated" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.json({ success: false, message: "Admin not found" });
        }

        if(user._id !== 'user_38Ns2VIFcmWT1tcYSjCXbYaq4Cc'){
            return res.json({ success: false, message: "Admin only access" });
        }
        next();
    } catch (error) {
        res.json({success: false, message: error.message});
        console.log(`protectAdmin error ${error.message}`);
    }
}