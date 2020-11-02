import { Response } from "express";
import { Auth, User } from "../entities";
import { UserDal } from '../dataAccess';
import { SuccessResponse, FailureMessageResponse } from '../core/ApiResponse';
import { IMessages } from "../interfaces";
import BaseController from "../controller/BaseController";

class UserBus {
    public static async SignIn(user: User, res: Response): Promise<any> {
        const isRegistered = await UserDal.get(user.email);
        if (isRegistered && !isRegistered.errors) {
            const response = new FailureMessageResponse(IMessages.AlreadyRegistered);
            return response.send(res);
        } else {
            const createUser = await UserDal.add(user);
            if (!createUser.errors) {
                const data = createUser.toObject();
                const response = new SuccessResponse(IMessages.OperationSuccess, data);
                return response.send(res);
            }
        }
        const response = new FailureMessageResponse(IMessages.OperationFailed);
        response.send(res);
    }
    public static async Login(user: Auth, res: Response): Promise<any> {
        const model = await (await UserDal.get(user.email));
        if (model && !model.errors) {
            if (model.password === user.password) {
                const token = await BaseController.JWEncode(model);
                model.updatedDate = new Date();
                model.token = token;
                const data = await UserDal.update(model);
                const response = new SuccessResponse(IMessages.OperationSuccess, data);
                return response.send(res);
            } else {
                const response = new FailureMessageResponse(IMessages.AuthenticationFailed);
                return response.send(res);
            }
        }
        const response = new FailureMessageResponse(IMessages.OperationFailed);
        return response.send(res);
    }
}
export default UserBus;