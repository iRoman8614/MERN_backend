import PostModel from '../models/Post.js'

export const getAllPosts = async (req, res) => {
    try{
        const allPosts = await PostModel.find().populate({ path: "user", select: ["name", "avatar",] }).exec()
        res.json(allPosts)
    }catch(e){
        console.log(e)
        res.status(500).json({message: "can't load all posts"})
    }
}

export const createPost = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId
        })
        const post = await doc.save()
        res.json(post)
    } catch(e) {
        console.log(e)
        return res.status(500).json({message: "creation error"})
    }
}

export const getOnePost = async (req, res) => {
    try{
        const postId = req.params.id;
        const doc = await PostModel.findOneAndUpdate(
            {_id: postId}, 
            {$inc: {viewsCount: 1}}, 
            {returnDocument: 'after'})
        if(doc === null) {
            return res.status(404).json({message: "Post was not found"})
        }
        res.json(doc)
    }catch(e){
        console.log(e)
        return res.status(404).json({message: "Post was not found"})
    }
}

export const removePost = async (req, res) => {
    try{
        const postId = req.params.id;
        const doc = await PostModel.findOneAndDelete({ _id: postId })
        if(doc === null) {
            return res.status(404).json({message: "Post was not found"})
        }
        res.json({success: true})
    }catch(e){
        console.log(e)
        return res.status(404).json({message: "Post was not found"})
    }
}

export const updatePost = async (req, res, next) => {
    try{
        const postId = req.params.id;
        const doc = await PostModel.findOneAndUpdate({ _id: postId }, {
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl
        })
        if(doc === null) {
            return res.status(404).json({message: "Post was not found"})
        }
        res.json({success: true})
    }catch(e){
        console.log(e)
        return res.status(500).json({message: "Post error"})
    }
}