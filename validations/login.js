import { check } from 'express-validator';

export const loginValidation = [
    check('email', "incorrect imail").isEmail(), //email check
    check('password', "password must be longer than 4").isLength({min: 4}), //password check
]