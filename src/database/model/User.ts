import { model, Schema } from 'mongoose';
import { User } from '../../entities';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

const { Types } = Schema;
const schema = new Schema(
    {
        name: {
            type: Types.String,
            required: true
        },
        surname: {
            type: Types.String,
            required: true
        },
        email: {
            type: Types.String
        },
        sex: {
            type: Types.String
        },
        password: {
            type: Types.String,
            required: true
        },
        phone: {
            type: Types.String
        },
        address: {
            type: Types.String
        },
        city: {
            type: Types.String
        },
        district: {
            type: Types.String
        },
        createdDate: {
            type: Types.Date,
            default: Date.now(),
        },
        updatedDate: {
            type: Types.Date,
        },
    }
);

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);

