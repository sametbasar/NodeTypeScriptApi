import { ITypes } from "../controller/ITypes";

export default interface Notifications {
    name: String,
    email: String,
    message: String,
    coords: String,
    type: ITypes,
    date: Date
}