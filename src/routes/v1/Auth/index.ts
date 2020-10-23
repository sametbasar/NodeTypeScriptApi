import express, { Request, Response } from 'express';
import { SuccessMsgResponse } from '../../../core/ApiResponse'
import { Auth } from '../../../entities'

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
    const data: Auth = req.body;
    let a = new SuccessMsgResponse("test");
    a.send(res);

});

export default router;