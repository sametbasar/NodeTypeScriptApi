import { Request, Router, Response } from 'express';
import { AuthMiddleware } from '../../../middleware';

const router = Router(); 

router.post('/Add', AuthMiddleware(), (req: Request, res: Response) => {
    throw new Error("Method Not Allowed");
});

router.delete('/Remove', AuthMiddleware(), (req: Request, res: Response) => {
    throw new Error("Method Not Allowed");
});

export default router;