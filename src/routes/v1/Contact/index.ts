import { Request, Router, Response } from 'express';
import { ContactBus } from '../../../business';
import Contacts from '../../../entities/contacts';
import { contactValidation } from './validations';
import { AuthMiddleware } from '../../../middleware';
import { IMessages } from '../../../interfaces';
import { FailureResponse } from '../../../core/ApiResponse';
import { validationResult } from 'express-validator';

const router = Router();

router.post('/Add', AuthMiddleware(), contactValidation, (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array();
        const errorResponse = new FailureResponse(IMessages.FillRequiredFields, errorMessage);
        errorResponse.send(res);
    } else {
        const token = req.headers['authorization'];
        const { email, badge, phone, name } = req.body;
        const contact: Contacts = {
            name,
            confirmed: false,
            email,
            phone,
            badge
        };
        ContactBus.Add(token, contact, res);
    }
});

router.delete('/Remove', AuthMiddleware(), (req: Request, res: Response) => {
    throw new Error("Method Not Allowed");
});


router.post('/Permission', AuthMiddleware(), (req: Request, res: Response) => {
    const { email, permission } = req.body;
    const token = req.headers['authorization'];
    ContactBus.Permission(email, permission, token, res);
});

export default router;