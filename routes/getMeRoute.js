import UserModel from '../models/User.js';

export const getMeRouter = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if(!user) {
            res.status(404).json({message: "user not found"})
        }
        const {passwordHash, ...userData } = user._doc //ignore password in responce 
        res.json(userData)
    } catch(e) {
        return res.status(404).json({message: "error"})
    }
}