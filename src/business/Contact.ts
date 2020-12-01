import { Response } from "express";
import { SuccessResponse, FailureMessageResponse, SuccessMessageResponse } from '../core/ApiResponse';
import { IMessages } from "../interfaces";
import { UserDal } from '../dataAccess';
import UserModel, { UserBaseDocument } from "../database/model/User";
import Logger from "../core/Logger";
import Contacts from "../entities/contacts";
import BaseController from "../controller/BaseController";
import { ITypes } from "../controller/ITypes";


class ContactBus {

    private static userDal = new UserDal(UserModel);

    public static async Add(token: String, contacts: Contacts, res: Response): Promise<any> {
        try {
            const result: any = await BaseController.JWTDecode(token);
            if (result && result.email) {
                const query = { email: result.email };
                const user = await this.userDal.get(query);
                user.contacts.push(contacts);

                // Eklenen kullanıcıya bildirim gönderme
                const notify_user_query = { email: contacts.email };
                const notify_user = await this.userDal.get(notify_user_query);

                if (notify_user != null && notify_user.email != null) {
                    const fullName = user.name + ' ' + user.surname;
                    const message = fullName + ' sizi acil durumda aranacaklar listesine ekledi. Acil durumda aranmak için izin vermeniz gerekmektedir.';
                    const notify = BaseController.NotifyCreater(fullName, user.email, message, ITypes.INFO);
                    notify_user.notifications.push(notify);

                    await this.userDal.update(notify_user.toObject(), notify_user_query);
                    await this.userDal.update(user.toObject(), query);
                    const response = new SuccessResponse(IMessages.OperationSuccess, user.toObject());
                    return response.send(res);
                }
                const response = new FailureMessageResponse(IMessages.EmailNotFound);
                return response.send(res);
            }
            const response = new FailureMessageResponse(IMessages.BadParameters);
            return response.send(res);
        } catch (err) {
            Logger.error(err);
            const response = new FailureMessageResponse(IMessages.BadParameters);
            return response.send(res);
        }
    }

    public static async Permission(email: String, Permission: Boolean, token: String, res: Response): Promise<any> {
        try {
            const result: any = await BaseController.JWTDecode(token);
            if (result && result.email) {
                const permission_email = result.email;
                const query = { email };
                const user = await this.userDal.get(query);
                if (Permission) {
                    await user.contacts.find((contact) => {
                        if (contact.email === permission_email) {
                            contact.confirmed = true;
                            contact.badge = contact.badge.filter((b => {
                                return b.name !== 'onay bekliyor';
                            }))
                        }
                    });
                    // Bildirim giden kullanıcıdan bildirimi silme
                    const notify_user_query = { email: permission_email };
                    const notify_user = await this.userDal.get(notify_user_query);
                    if (notify_user != null && notify_user.email != null) {
                        notify_user.notifications = notify_user.notifications.filter((notify) => {
                            return notify.email !== email;
                        });
                        await this.userDal.update(notify_user, notify_user_query);
                        await this.userDal.update(user, query);
                        const response = new SuccessResponse(IMessages.OperationSuccess, notify_user.toObject());
                        return response.send(res);
                    }

                } else {
                    user.contacts = await user.contacts.filter((contact) => {
                        return contact.email !== permission_email;
                    });
                    // Bildirim giden kullanıcıdan bildirimi silme
                    const notify_user_query = { email: permission_email };
                    const notify_user = await this.userDal.get(notify_user_query);
                    if (notify_user != null && notify_user.email != null) {
                        notify_user.notifications = notify_user.notifications.filter((notify) => {
                            return notify.email !== email;
                        });
                        await this.userDal.update(notify_user, notify_user_query);
                        await this.userDal.update(user, query);
                        const response = new SuccessResponse(IMessages.OperationSuccess, notify_user.toObject());
                        return response.send(res);
                    }
                }
            }
        } catch (err) {
            Logger.error(err);
            const response = new FailureMessageResponse(IMessages.BadParameters);
            return response.send(res);
        }
    }

}
export default ContactBus;