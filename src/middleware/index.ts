import { NextFunction, Request, Response } from "express";
import { AuthBus } from "../business";
import { FailureMessageResponse } from "../core/ApiResponse";
import { IMessages } from "../interfaces";

export const AuthMiddleware = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = await req.headers['authorization'];
        if (token) {
            AuthBus.middleware(token, res, next);
        } else {
            const response = new FailureMessageResponse(IMessages.TokenFailed);
            return response.send(res);
        }
    }
}
