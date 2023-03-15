import config from "config";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';

export const registrationRouter = async (req, res) => { // registrarion function with validation
    try {
        const password = req.body.password // hashing
        const hash = await bcrypt.hash(password, 8); 
        const doc = new UserModel({ //sending info to db
            email: req.body.email,
            name: req.body.name,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash
        })
        const user = await doc.save();
        const token = jwt.sign({ //creating token
            _id: user._id
        }, config.get("SecretKey"), {
            expiresIn: '1d'
        })
        const {passwordHash, ...userData } = user._doc //ignore password in responce 
        res.json({
            ...userData,
            token
        })
    } catch(e) {
        console.log(e)
        res.status(500).json({message: "registration error"})
    }
}