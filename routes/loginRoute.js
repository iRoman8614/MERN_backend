import config from "config";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';

export const loginRouter = async(req, res) =>{ //login function
    try {
        const user = await UserModel.findOne({ email: req.body.email}) // search in db by email
        if (!user) { // if email not found 
            return res.status(404).json({message: "User not found"})
        }
        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash) //check password
        if (!isValidPassword) { // if incorrect password
            return res.status(400).json({message: "Incorrect email or password"})
        }

        const token = jwt.sign({ // if everything is correct create a token
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
        return res.status(500).json({message: "Login error"})
    }
}