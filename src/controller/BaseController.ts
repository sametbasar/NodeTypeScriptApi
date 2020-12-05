import JWT from 'jsonwebtoken';
import { jwtKey } from '../config';
import { Coords, Notification } from '../entities';
import { ITypes } from './ITypes';

export default abstract class BaseController {

    private static readonly secretKey: string = jwtKey;

    /**
    * Encode your variable
    * @param code Any variable to encode
    */
    public static async JWEncode(code: any): Promise<String> {
        const JWTCode = await JWT.sign(code, this.secretKey, {
            expiresIn: 7776000 // 3months active
        });
        return JWTCode.toString()
    }

    /**
    * Decode your variable
    * @param code Any variable to encode
    */
    public static async JWTDecode(code: any): Promise<Object> {
        const JWTCode = await JWT.verify(code, this.secretKey);
        return JWTCode
    }

    /**
    *  Create your notication
    *  @param name string bir yazı gönderebilirsiniz bu alan zorunludur.
    *  @param message string bir yazı gönderebilirsiniz bu alan zorunludur.
    *  @param type ITypes interface türünde type göndermeniz gerekmektedir.
    *  @param coords string türünde koordinat yollayabilirsiniz bu alan zorunlu değildir.
    *  @param date Date türünde gönderilmektedir bu değişkenin default değeri istek atıldığı zamandır
    **/
    public static NotifyCreater(name: String, email: String, message: String, type: ITypes, coords?: Coords, date: Date = new Date()) {
        const notify: Notification = {
            name,
            email,
            message,
            type,
            coords,
            date
        }
        return notify;
    }


}
