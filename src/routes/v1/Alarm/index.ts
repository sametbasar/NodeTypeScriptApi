import { Request, Router, Response } from 'express';
import { AuthMiddleware } from '../../../middleware';

const router = Router();

router.post('/', AuthMiddleware(), (req: Request, res: Response) => {
    throw new Error("Method Not Allowed");
}); 

export default router;