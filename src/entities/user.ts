import { Badge } from "./Badge";
import Contacts from "./contacts";

enum Gender {
    Male = "Erkek",
    Female = "Kadın"
}

export default interface User {
    identityNumber: Number,
    name: string,
    surname: string,
    email: string,
    gender?: Gender,
    password: string,
    phone?: string,
    address?: string,
    city?: string,
    district?: string,
    createdDate: Date,
    updatedDate?: Date,
    badge?: Badge[],
    contacts?: Contacts[],
    token?: String
}