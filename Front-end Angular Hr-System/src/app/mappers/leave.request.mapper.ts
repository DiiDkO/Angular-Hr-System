import { HttpErrorResponse } from '@angular/common/http';
import { LeaveTypeService } from '../services/leave-type.service';
import { UserService } from '../services/user.service';
import { UserMapper } from './user.mapper';

export class LeaveRequestMapper  {
    private mappedList:any[] = [];
  
     map(entity: any, userService:UserService, leaveTypeService:LeaveTypeService) {
       var leaveReq = {
            id: entity.id,
            startDate: entity.startDate,
            endDate:entity.endDate,
            requestedDays: entity.requestedDays,
            status: entity.status,
            leaveType:null,
            requestor:null,
            approver:null,
        }
        if(entity.leaveType) {
            leaveTypeService.getLeaveTypeById(entity.leaveType)
                            .subscribe(  data => {
                                 if(data)
                                    leaveReq.leaveType = data;
                           },
                           (error:HttpErrorResponse) => {
                              console.log(error.name + ' ' + error.message)
                           });
        }

        if(entity.requestor) {
            userService.getUserById(entity.requestor)
              .subscribe(data => {
                leaveReq.requestor = data;
              },
              (error:HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message)
             });
             
        }

        if(entity.approver) {
            userService.getUserById(entity.approver)
            .subscribe(data => {
              leaveReq.approver = data;
            },
            (error:HttpErrorResponse) => {
              console.log(error.name + ' ' + error.message)
           });
        }
      
        return leaveReq;
    };

    mapList(entityList: any[], userService:UserService, leaveTypeService:LeaveTypeService) {
       this.mappedList = [];
       entityList.forEach(group => {
           this.mappedList.push(this.map(group,userService,leaveTypeService));
        })
        return this.mappedList;
        
    };

}