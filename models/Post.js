import * as mongoose from "mongoose"

const PostSchima = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, //post title
    text: {
        type: String,
        required: true
    }, //post text
    tags: {
        type: Array,
        default: []
    }, //tags
    viewsCount: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', //link to another db table, connecting to user id
        required: true
    },
    imageUrl: { type: String},
}, {
    timestamps: true //добавление даты создания и обновления данных
})

export default mongoose.model('Post', PostSchima)