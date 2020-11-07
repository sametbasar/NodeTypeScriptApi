import { NextFunction, Request, Response } from "express";

export const AuthMiddleware = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.headers['content-type'] !== 'application/json') {
            res.status(400).send('Server requires application/json');
        } else {
            next();
        }
    }
}
