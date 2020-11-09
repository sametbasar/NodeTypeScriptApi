import JWT from 'jsonwebtoken';
import { jwtKey } from '../config';

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

}
