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

        req.user = user;
        next();
    } catch (error) {
        res.json({success: false, message: error.message});
        console.log(`protectUser error ${error.message}`)
    }
}