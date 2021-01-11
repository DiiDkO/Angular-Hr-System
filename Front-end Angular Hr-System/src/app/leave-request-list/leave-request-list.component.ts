import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveRequestMapper } from '../mappers/leave.request.mapper';
import { LeaveRequest } from '../models/leaveRequest.model';
import { LoginUser } from '../models/loginUser.model';
import { LeaveRequestService } from '../services/leave-request.service';
import { LeaveTypeService } from '../services/leave-type.service';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-leave-request-list',
  templateUrl: './leave-request-list.component.html',
  styleUrls: ['./leave-request-list.component.css']
})
export class LeaveRequestListComponent implements OnInit {
  leaveRequestList:LeaveRequest[];
  label:string = 'Leave Request';
  currentUser:LoginUser;
  constructor(private leaveReqService:LeaveRequestService,private userService:UserService, private leaveTypeService:LeaveTypeService, private loginService:LoginService, private router:Router, private mapper:LeaveRequestMapper) { 
    this.loginService.currentUser.subscribe(x=> this.currentUser =x);
  }

  ngOnInit(): void {
    if(!this.currentUser)
        this.router.navigate(['/login']);
    else
        this.loadData();
  }

  loadData() {
    this.leaveReqService.getAllLeaveRequest()
    .subscribe(data=> {
     
      this.leaveRequestList = this.mapper.mapList(data, this.userService, this.leaveTypeService);
     },
     (error:HttpErrorResponse) => {
       console.log(error.name + ' '+ error.message); 
     })
  }
}
