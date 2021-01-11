import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserMapper } from '../mappers/user.mapper';
import { LoginUser } from '../models/loginUser.model';
import { User } from '../models/user.model';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  label:string;
  userList:any[] = [];
  currentUser:LoginUser;
  isAdmin:boolean = false;
  constructor(private userService:UserService,private loginService:LoginService, private router:Router, private mapper:UserMapper) {
    this.loginService.currentUser.subscribe(x=> this.currentUser =x);
    this.isAdmin = this.currentUser.roles.includes("admin");
   }
  
  ngOnInit(): void {
  
    if(!this.currentUser)
      this.router.navigate(['/login'])
    else {
      this.label ="User";
      this.loadData();
    }
  }

  loadData() {
     this.userService.getAllUsers()
     .subscribe(data=> {
       this.userList = this.mapper.mapList(data, this.userService);
      },
      (error:HttpErrorResponse) => {
        console.log(error.name + ' '+ error.message); 
      })
  }
}
