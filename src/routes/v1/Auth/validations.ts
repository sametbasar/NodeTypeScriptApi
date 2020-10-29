import { check } from 'express-validator/check';

export const loginValidation = [
    check('email', 'Geçerli Bir mail adresi giriniz')
        .not()
        .isEmpty()
        .isEmail(),
    check('password')
        .not()
        .isEmpty()
]

export const registerValidation = [
    check('email', 'Geçerli Bir mail adresi giriniz')
        .not()
        .isEmpty()
        .isEmail(),
    check('phone')
        .not()
        .isEmpty()
        .isNumeric(),
    check('name')
        .not()
        .isEmpty()
        .isString(),
    check('surname')
        .not()
        .isEmpty()
        .isString(),
    check('identityNumber')
        .not()
        .isEmpty()
        .isNumeric(),
    check('password')
        .not()
        .isEmpty()
];