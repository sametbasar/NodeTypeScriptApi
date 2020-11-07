import { Response } from 'express';
import { IMessages } from '../interfaces';

enum ResponseStatus {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500,
}

abstract class ApiResponse {
    constructor(
        protected Status: ResponseStatus,
        protected Success: Boolean,
        protected Message: IMessages,
    ) { }

    protected prepare<T extends ApiResponse>(res: Response, response: T): Response {
        return res.status(this.Status).json(ApiResponse.sanitize(response));
    }

    public send(res: Response): Response {
        return this.prepare<ApiResponse>(res, this);
    }

    private static sanitize<T extends ApiResponse>(response: T): T {
        const clone: T = {} as T;
        Object.assign(clone, response);
        // delete {some_field};
        delete clone.Status;
        for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i];
        return clone; //Response oluşturulurken status hariç geri kalan değerleri response'a gönderir.
    }
}

export class SuccessMessageResponse extends ApiResponse {
    constructor(message: IMessages) {
        super(ResponseStatus.SUCCESS, true, message);
    }
    send(res: Response): Response {
        return super.prepare<SuccessMessageResponse>(res, this);
    }
}

export class SuccessResponse<T> extends ApiResponse {
    constructor(message: IMessages, private Data: T) {
        super(ResponseStatus.SUCCESS, true, message);
    }

    send(res: Response): Response {
        return super.prepare<SuccessResponse<T>>(res, this);
    }
}

export class FailureResponse<T> extends ApiResponse {
    constructor(message: IMessages, private Data: T) {
        super(ResponseStatus.SUCCESS, false, message);
    }
    send(res: Response): Response {
        return super.prepare<FailureResponse<T>>(res, this);
    }
}

export class FailureMessageResponse extends ApiResponse {
    constructor(message: IMessages) {
        super(ResponseStatus.SUCCESS, false, message)
    }
    send(res: Response): Response {
        return super.prepare<FailureMessageResponse>(res, this);
    }
}