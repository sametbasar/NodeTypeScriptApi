import { Router, Request, Response } from 'express';
import { Auth, User } from '../../../entities';
import { AuthBus } from '../../../business';
import { validationResult } from 'express-validator';
import { loginValidation, customerInfoValidation, registerValidation } from './validations';
import { FailureResponse } from '../../../core/ApiResponse';
import { IMessages } from '../../../interfaces';


const router = Router();

router.post('/SignIn', registerValidation, (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array();
        const errorResponse = new FailureResponse(IMessages.FillRequiredFields, errorMessage);
        errorResponse.send(res);
    } else {
        const user: User = req.body;
        AuthBus.SignIn(user, res);
    }
});

router.post('/Login', loginValidation, (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array();
        const errorResponse = new FailureResponse(IMessages.FillRequiredFields, errorMessage);
        errorResponse.send(res);
    } else {
        const user: Auth = req.body;
        AuthBus.Login(user, res);
    }
});

router.post('/GetCustomerInfo', customerInfoValidation, (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array();
        const errorResponse = new FailureResponse(IMessages.FillRequiredFields, errorMessage);
        errorResponse.send(res);
    } else {
        const email: String = req.body?.email;
        AuthBus.isValidToken(email, res);
    }
});

router.get('/IsValidToken', (req: Request, res: Response) => {
    const token = req.headers['authorization'];
    AuthBus.isValidToken(token, res);
});

export default router;