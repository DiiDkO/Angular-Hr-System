import { NgIf } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveType } from '../models/leaveType.model';
import { LoginUser } from '../models/loginUser.model';
import { LeaveTypeService } from '../services/leave-type.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-leave-type-list',
  templateUrl: './leave-type-list.component.html',
  styleUrls: ['./leave-type-list.component.css']
})
export class LeaveTypeListComponent implements OnInit {
  label:string;
  leaveTypeList:LeaveType[];
  currentUser:LoginUser;
  isAdmin:boolean = false;
  leaveTypes: LeaveTypeService | null;
  test:LeaveType[];
  constructor( private leaveTypeService:LeaveTypeService, private loginService:LoginService, private router:Router) {
    this.loginService.currentUser.subscribe(x=> this.currentUser =x);
    this.isAdmin = this.currentUser.roles.includes("admin");
   }

  ngOnInit(): void {
    if(!this.currentUser)
        this.router.navigate(['/login']);
    else {
        this.label = 'Leave Type';
        this.loadData();
    }
  }
  	loadData() {
      this.leaveTypeService.getAllLeaveTypes().subscribe(data => {
        this.leaveTypeList = data;
      }, 
      (error:HttpErrorResponse) => {
        console.log(error.name + ' '+ error.message); 
      })
     
    }
}
