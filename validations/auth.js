import { check } from 'express-validator';

export const registrationValidation = [
    check('email', "incorrect imail").isEmail(), //email check
    check('password', "password must be longer than 4").isLength({min: 4}), //password check
    check('name', 'incorrect name').isLength({min: 3}), //name check
    check('avatarUrl').optional().isURL() //if get avatar check 
]

