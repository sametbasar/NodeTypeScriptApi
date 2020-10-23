import { Document } from "mongoose"; 
import { Badge } from './Badge';

export default interface User extends Document {
    name: string,
    surname: string,
    email: string,
    sex?: string,
    password: string,
    phone?: string,
    address?: string,
    city?: string,
    district?: string,
    createdDate: Date,
    updatedDate?: Date,
    contacts?: Array<object>,
    badge?: Badge[]
}
