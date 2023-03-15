import express from "express";
import config from "config";
import mongoose from "mongoose";
import multer from 'multer';

import { registrationValidation } from './validations/auth.js';
import { loginValidation } from './validations/login.js';
import checkAuth from "./validations/checkAuth.js";
import { postCreateValidation } from "./validations/post.js";
import errorsValidationResault from "./validations/errorsValidationResault.js"

import {registrationRouter } from "./routes/reistrationRoute.js";
import {loginRouter} from "./routes/loginRoute.js";
import {getMeRouter} from "./routes/getMeRoute.js";

import * as postController from "./controllers/postController.js";



const app = express();
const PORT = config.get('Port');
app.use(express.json())
app.use('/uploads', express.static('uploads'));

const multerStorage  = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })
  const upload = multer({storage:  multerStorage })

mongoose
    .connect(config.get("mongoURL"))
    .then(() => console.log("database connected"))
    .catch((e) => console.log("error", e))

app.post('/auth/registration', registrationValidation, errorsValidationResault, registrationRouter)
app.post('/auth/login', loginValidation, errorsValidationResault, loginRouter)
app.get('/auth/me', checkAuth, getMeRouter)

app.post('/uploads', checkAuth, upload.single('image'), (req, res) => {
    try {
        res.json({
            url: `uploads/${req.file.originalname}`
        })
    } catch(e) {
        console.log(e)
        return res.status(500).json({message: "can not upload file"})
    }
})

//CRUD posts requests
app.get('/posts', postController.getAllPosts)
app.get('/posts/:id', postController.getOnePost)
app.post('/posts', checkAuth, postCreateValidation, errorsValidationResault, postController.createPost)
app.delete('/posts/:id', checkAuth, postController.removePost)
app.patch('/posts/:id', checkAuth, postCreateValidation, errorsValidationResault, postController.updatePost)

const start = async () => {
    try {
        app.listen(PORT || 5000, ()=>{
            console.log('server started on port', PORT)
        });
    } catch (e) {
        console.log("error", e)
    }
}
start();