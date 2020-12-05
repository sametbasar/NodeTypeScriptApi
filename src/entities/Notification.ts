import { ITypes } from "../controller/ITypes";
import Coords from "./coords";

export default interface Notifications {
    name: String,
    email: String,
    message: String,
    coords: Coords,
    type: ITypes,
    date: Date
}