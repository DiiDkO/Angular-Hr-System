import { Group } from './group.model';

export class User {
    id:number;
    username:string;
    password:string;
    active:boolean;
    firstName:string;
    middleName:string;
    lastName:string;
    email:string;
    manager:User;
    groups:number[];
}