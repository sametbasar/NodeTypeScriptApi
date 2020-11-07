import { Response } from "express";
import { SuccessResponse, FailureMessageResponse } from '../core/ApiResponse';
import { IMessages } from "../interfaces";
import { UserDal } from '../dataAccess';
import { User } from "../entities";
import UserModel from "../database/model/User";
import Logger from "../core/Logger";


class UserBus {

    private static userDal = new UserDal(UserModel);

    public static async Save(user: User, res: Response): Promise<any> {
        try {
            const query = { email: user.email };
            user.updatedDate = new Date();
            const data = await this.userDal.update(user, query);
            const response = new SuccessResponse(IMessages.OperationSuccess, data.toObject());
            return response.send(res);
        } catch (err) {
            Logger.error(err);
            const response = new FailureMessageResponse(IMessages.BadParameters);
            return response.send(res);
        } 
    }

}
export default UserBus;