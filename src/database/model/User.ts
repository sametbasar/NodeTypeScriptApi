import { Document, model, Schema } from "mongoose"
import { Badge, User } from "../../entities"


// Schema
const UserSchema = new Schema({
    identityNumber: {
        required: true,
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    district: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now(),
    },
    updatedDate: {
        type: Date,
    },
    token: {
        type: String
    },
    contacts: {
        type: Array
    },
    badge: {
        type: Array
    },
    notifications: {
        type: Array
    },
    emergency: {
        type: Boolean
    }
})



export interface UserBaseDocument extends User, Document {
}


// Default export
export default model<UserBaseDocument>("User", UserSchema)


