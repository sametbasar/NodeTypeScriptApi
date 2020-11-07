import { body } from 'express-validator';

export const userValidation = [
    body('email', 'Geçerli Bir mail adresi giriniz')
        .not()
        .isEmpty()
        .isEmail(),
    body('phone')
        .not()
        .isEmpty()
        .isNumeric({ no_symbols: true }),
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
        .isNumeric({ no_symbols: true }),
]