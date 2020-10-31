import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Geçerli Bir mail adresi giriniz')
        .not()
        .isEmpty()
        .isEmail(),
    body('password')
        .not()
        .isEmpty()
]

export const registerValidation = [
    body('email', 'Geçerli Bir mail adresi giriniz')
        .not()
        .isEmpty()
        .isEmail(),
    body('phone')
        .not()
        .isEmpty()
        .isNumeric(),
    body('name')
        .not()
        .isEmpty()
        .isString(),
    body('surname')
        .not()
        .isEmpty()
        .isString(),
    body('identityNumber')
        .not()
        .isEmpty()
        .isNumeric(),
    body('password')
        .not()
        .isEmpty()
];