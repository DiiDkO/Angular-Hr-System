import { Role } from './role.model';
import { User } from './user.model';

export class Group {
    id:number;
    name:string;
    email:string;
    manager:User;
    members:User[];
    roles:Role[];
}