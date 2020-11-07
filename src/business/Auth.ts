import BaseController from "../controller/BaseController";
import { Response } from "express";
import { SuccessResponse, FailureMessageResponse } from '../core/ApiResponse';
import { IMessages } from "../interfaces";
import { AuthDal } from '../dataAccess';
import { Auth, User } from "../entities";
import UserModel from "../database/model/User";
import Logger from "../core/Logger";


class AuthBus {

    private static authDal = new AuthDal(UserModel);

    public static async SignIn(user: User, res: Response): Promise<any> {
        try {
            const query = { email: user.email };
            const isRegistered = await this.authDal.get(query);
            if (isRegistered && !isRegistered.errors) {
                const response = new FailureMessageResponse(IMessages.AlreadyRegistered);
                return response.send(res);
            } else {
                const createUser = await this.authDal.add(user);
                if (!createUser.errors) {
                    const response = new SuccessResponse(IMessages.OperationSuccess, createUser);
                    return response.send(res);
                }
            }
            const response = new FailureMessageResponse(IMessages.OperationFailed);
            response.send(res);
        } catch (error) {
            Logger.error(error);
            const response = new FailureMessageResponse(IMessages.OperationFailed);
            response.send(res);
        }

    }
    public static async Login(user: Auth, res: Response): Promise<any> {
        try {
            const query = { email: user.email };
            const data = await this.authDal.get(query);
            const model = data.toObject();
            if (model && !model.errors) {
                if (model.password === user.password) {
                    const token = await BaseController.JWEncode(model);
                    model.updatedDate = new Date();
                    model.token = token;
                    await this.authDal.update(model, query);
                    const response = new SuccessResponse(IMessages.OperationSuccess, model);
                    return response.send(res);
                } else {
                    const response = new FailureMessageResponse(IMessages.AuthenticationFailed);
                    return response.send(res);
                }
            }
            const response = new FailureMessageResponse(IMessages.OperationFailed);
            return response.send(res);
        } catch (error) {
            Logger.error(error);
            const response = new FailureMessageResponse(IMessages.OperationFailed);
            return response.send(res);
        }

    }
    public static async isValidToken(token: String, res: Response): Promise<any> {
        try {
            if (token) {
                const result: any = await BaseController.JWTDecode(token);
                if (result && result.email) {
                    const query = { email: result.email };
                    const model = await this.authDal.get(query);
                    if (model && !model.errors) {
                        const response = new SuccessResponse(IMessages.OperationSuccess, model);
                        return response.send(res);
                    }
                }
                const response = new FailureMessageResponse(IMessages.TokenFailed);
                return response.send(res);
            }
        } catch (error) {
            Logger.error(error);
            const response = new FailureMessageResponse(IMessages.TokenFailed);
            return response.send(res);
        }
    }
}
export default AuthBus;