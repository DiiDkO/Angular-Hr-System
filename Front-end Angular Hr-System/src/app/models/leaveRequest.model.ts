import { LeaveType } from './leaveType.model';
import { User } from './user.model';

export class LeaveRequest{
    id:number;
    startDate:string;
    endDate:string;
    leaveType:LeaveType;
    requestedDays:number;
    status:string;
    requestor:User;
    approver: User;
}