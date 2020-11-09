import { Request, Router, Response } from 'express';
import { validationResult } from 'express-validator';
import { UserBus } from '../../../business';
import { FailureResponse } from '../../../core/ApiResponse';
import { IMessages } from '../../../interfaces';
import { userValidation } from './validations';
import { AuthMiddleware } from '../../../middleware';

const router = Router();

router.put('/Save', AuthMiddleware(), userValidation, (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array();
        const errorResponse = new FailureResponse(IMessages.FillRequiredFields, errorMessage);
        errorResponse.send(res);
    } else {
        const data = req.body;
        UserBus.Save(data, res);
    }
});

export default router;