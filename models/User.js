import mongoose  from "mongoose"

const UserSchima = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, //user name
    email: {
        type: String,
        required: true,
        unique: true
    }, //unique email
    passwordHash: {
        type: String,
        repuered: true
    }, //hashed password
    avatarUrl: String,
}, {
    timestamps: true //add creating and updating times
})

export default mongoose.model('User', UserSchima)