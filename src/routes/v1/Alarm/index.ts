import { Request, Router, Response } from 'express';
import { AlarmBus } from '../../../business';
import { Coords } from '../../../entities';
import { AuthMiddleware } from '../../../middleware';

const router = Router();

router.post('/', AuthMiddleware(), (req: Request, res: Response) => {
    const coords: Coords = req.body;
    const token = req.headers['authorization'];
    AlarmBus.Alarm(coords, token, res);
});

router.post('/Cancel', AuthMiddleware(), (req: Request, res: Response) => {
    const token = req.headers['authorization'];
    AlarmBus.Cancel(token, res);
});

export default router;