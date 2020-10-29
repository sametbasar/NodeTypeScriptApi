import JWT from 'jsonwebtoken';

export default abstract class BaseController {

    private static readonly secretKey: string = 'As3f4xBRHrT5nSsP7amA3F53P6kYrsFNkHNcmG';

    /**
    * Encode your variable
    * @param code Any variable to encode
    */
    public static async JWEncode(code: any): Promise<String> {
        const JWTCode = await JWT.sign(code, this.secretKey);
        return JWTCode.toString()
    }

    /**
    * Decode your variable
    * @param code Any variable to encode
    */
    public static async JWTDecode(code: any): Promise<String> {
        const JWTCode = await JWT.verify(code, this.secretKey);
        return JWTCode.toString()
    }

}
