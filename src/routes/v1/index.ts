import express, { Request, Response } from 'express';
import { AuthMiddleware } from '../../middleware/'
import Auth from './Auth'

const router = express.Router();

router.get('/', AuthMiddleware(), (req: Request, res: Response) => {
    res.send('Api Helper Docs');
});

router.use('/Auth', Auth);

export default router;