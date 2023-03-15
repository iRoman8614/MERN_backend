import jwt from 'jsonwebtoken';
import config from "config";

export default (req, res, next) => {
    const token = (req.headers.authorization || '' ).replace(/Bearer\s?/, '')
    if(token) {
        try {
            const key = config.get("SecretKey")
            const decoded = jwt.verify(token, key)
            req.userId = decoded._id
            next()
        } catch(e) {
            return res.status(403).json({
                message: "access denied"
            })
        }
    } else {
        return res.status(403).json({
            message: "access denied"
        })
    }
}