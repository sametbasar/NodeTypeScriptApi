import { Response } from "express";
import { SuccessMessageResponse, FailureMessageResponse } from '../core/ApiResponse';
import { IMessages } from "../interfaces";
import { UserDal } from '../dataAccess';
import UserModel from "../database/model/User";
import Logger from "../core/Logger";
import { Coords } from "../entities";
import BaseController from "../controller/BaseController";
import { ITypes } from "../controller/ITypes";


class AlarmBus {

    private static userDal = new UserDal(UserModel);

    public static async Alarm(coords: Coords, token: String, res: Response): Promise<any> {
        try {
            const result: any = await BaseController.JWTDecode(token);
            if (result && result.email) {
                const query = { email: result.email };
                const user = await this.userDal.get(query);

                user.emergency = true;
                await this.userDal.update(user, query);

                if (user.contacts.length > 0) {
                    user.contacts.forEach(async contact => {
                        let contactQuery = { email: contact.email };
                        let contactUser = await this.userDal.get(contactQuery);
                        if (contactUser && contactUser.email) {
                            const fullName = user.name + ' ' + user.surname;
                            const Message = fullName + ' acil durum çağrısı yaptı. Konumunu öğrenmek için canlı konumu gör butonuna tıklayabilirsiniz.';
                            const notify = BaseController.NotifyCreater(fullName, contactUser.email, Message, ITypes.DANGER, coords);
                            contactUser.notifications.push(notify);
                            await this.userDal.update(contactUser, contactQuery);
                        }
                    });

                    const response = new SuccessMessageResponse(IMessages.OperationSuccess);
                    return response.send(res);
                } else {
                    const response = new FailureMessageResponse(IMessages.NotFound);
                    return response.send(res);
                }
            } else {
                const response = new FailureMessageResponse(IMessages.TokenFailed);
                return response.send(res);
            }
        } catch (err) {
            Logger.error(err);
            const response = new FailureMessageResponse(IMessages.BadParameters);
            return response.send(res);
        }
    }

    public static async Cancel(token: String, res: Response): Promise<any> {
        try {
            const result: any = await BaseController.JWTDecode(token);
            if (result && result.email) {
                const query = { email: result.email };
                const user = await this.userDal.get(query);
                if (user.contacts.length > 0) {
                    user.contacts.forEach(async contact => {
                        let contactQuery = { email: contact.email };
                        let contactUser = await this.userDal.get(contactQuery);
                        const newNotifyData = await contactUser.notifications.filter((notify) => {
                            return notify.email !== result.email && notify.type !== ITypes.DANGER;
                        });
                        contactUser.notifications = newNotifyData;
                        await this.userDal.update(contactUser, contactQuery);
                    });
                    user.emergency = false;
                    await this.userDal.update(user, query);

                    const response = new SuccessMessageResponse(IMessages.OperationSuccess);
                    return response.send(res);
                } else {
                    const response = new SuccessMessageResponse(IMessages.NotFound);
                    return response.send(res);
                }
            } else {
                const response = new FailureMessageResponse(IMessages.TokenFailed);
                return response.send(res);
            }
        } catch (err) {
            Logger.error(err);
            const response = new FailureMessageResponse(IMessages.BadParameters);
            return response.send(res);
        }
    }

}
export default AlarmBus;