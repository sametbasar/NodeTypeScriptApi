import express, { Request, Response } from 'express';
import { Auth, User } from '../../../entities';
import AuthService from '../../../services/Auth'
import { validationResult } from 'express-validator/check';
import { loginValidation, registerValidation } from './validations'
import { FailureResponse } from '../../../core/ApiResponse';


const router = express.Router();

router.post('/SignIn', registerValidation, (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array();
        const errorResponse = new FailureResponse('Zorunlu alanları doldurunuz.', errorMessage);
        errorResponse.send(res);
        return
    } else {
        const user: User = req.body;
        AuthService.SignIn(user, res);
    }
});

router.post('/Login', loginValidation, (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array();
        const errorResponse = new FailureResponse('Zorunlu alanları doldurunuz.', errorMessage);
        errorResponse.send(res);
    } else {
        const user: Auth = req.body;
        AuthService.Login(user, res);
    }
});
export default router;