import { Badge } from "./Badge";

export default interface Contacts {
    name: String,
    email: String,
    phone: Number,
    order?: Number,
    confirmed: Boolean,
    badge: Badge[]
}

// name: 'Babam', 
// order: '1',
// confirmed: true,
// badges: [
//   {
//     id: 1,
//     name: 'aile üyesi',
//   },
//   {
//     id: 2,
//     name: 'kişiler listesinde',
//   },
// ],