import { check } from 'express-validator';

export const postCreateValidation = [
    check('title', "Please, enter the title").isLength({min: 3}).isString(), //title check
    check('text', "Please, enter your thoughts").isLength({min: 1}).isString(), //text check
    //check('tags', 'incorrect format').optional().isString(), //if get tags check
    check('tags', 'incorrect format').optional().isArray(), //if get tags check
    //check('imageUrl', 'incorrect url').optional().isURL() //if get image check
    check('imageUrl', 'incorrect url').optional().isString() //if get image check 
]