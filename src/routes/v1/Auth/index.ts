import express, { Request, Response } from 'express';
import { Auth, User } from '../../../entities';
import UserBus from '../../../business/User';
import { validationResult } from 'express-validator';
import { loginValidation, registerValidation } from './validations';
import { FailureResponse } from '../../../core/ApiResponse';
import { IMessages } from '../../../interfaces';


const router = express.Router();

router.post('/SignIn', registerValidation, (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array();
        const errorResponse = new FailureResponse(IMessages.FillRequiredFields, errorMessage);
        errorResponse.send(res);
    } else {
        const user: User = req.body;
        UserBus.SignIn(user, res);
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
        UserBus.Login(user, res);
    }
});
export default router;