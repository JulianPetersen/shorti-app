import { User } from "./user";

export interface Localnotification {

    id?:string,
    date:string,
    title:string;
    messagge:string,
    user:User[]
}
