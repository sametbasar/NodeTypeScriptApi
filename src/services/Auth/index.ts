import { Response } from "express";
import { User, Auth } from "../../entities";
import UserResponse from '../../database/repository/UserRepo';
import { InternalError, AuthFailureError } from '../../core/ApiError';
import { InternalErrorResponse, FailureMsgResponse, SuccessResponse, AuthFailureResponse } from '../../core/ApiResponse';
import BaseController from "../../controller/BaseController";


export default class AuthService {

    /**
     * Create User Data Service
     * @param user Object on create the user object.
     * @param res Comes to express Response variable.
     */


    public static async SignIn(user: User, res: Response): Promise<any> {
        const UserModel = new UserResponse();
        const query = { email: user.email };
        const userFindRes = await UserModel.findOne(query);
        if (userFindRes._id) {
            const errorMessage = "Mail Adresi Kayıtlı!";
            const errorRes = new FailureMsgResponse(errorMessage);
            return errorRes.send(res);
        } else {
            const response = await UserModel.create(user);
            if (!response.errors) {
                const successResponse = new SuccessResponse(null, response)
                return successResponse.send(res);
            }
        }
        const errorMessage = new InternalError();
        const errorResponse = new InternalErrorResponse(errorMessage.message);
        return errorResponse.send(res);
    }

    /**
     * Login User Service
     * @param user Object on create the user object.
     * @param res Comes to express Response variable.
     */
    public static async Login(user: Auth, res: Response): Promise<any> {
        const UserFind = new UserResponse();
        const query = { email: user.email };
        const response = await UserFind.findOne(query);
        if (!response.errors) {
            if (response.password === user.password) {
                const model = response.toObject();
                const token = await BaseController.JWEncode(model);
                response.token = token;
                const updatedToken = await UserFind.update(response);
                const successResponse = new SuccessResponse('Giriş Başarılı', updatedToken);
                return successResponse.send(res);
            } else {
                const authError = new AuthFailureError('Giriş Başarısız');
                const authResponse = new AuthFailureResponse(authError.message);
                return authResponse.send(res);
            }
        }
        const errorMessage = new InternalError();
        const errorResponse = new InternalErrorResponse(errorMessage.message);
        return errorResponse.send(res);
    }
} 
