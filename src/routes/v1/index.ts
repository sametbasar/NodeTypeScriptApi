import { Request, Router, Response } from 'express';
import { AuthMiddleware } from '../../middleware/'
import Auth from './Auth';
import User from './User';
import Contact from './Contact';
import Alarm from './Alarm';

const router = Router();

router.get('/', AuthMiddleware(), (req: Request, res: Response) => {
    res.send('Api Helper Docs');
});

router.use('/Auth', Auth);

router.use('/User', User);

router.use('/Alarm', Alarm);

router.use('/Contact', Contact);

export default router;