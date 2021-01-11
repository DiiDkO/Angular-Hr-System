import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from '../models/loginUser.model';
import { Role } from '../models/role.model';
import { LoginService } from '../services/login.service';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
roleList:Role[];
label:string;
currentUser:LoginUser;
isAdmin:boolean = false;
  constructor(private roleService: RoleService, private loginService:LoginService, private router:Router) {
      this.loginService.currentUser.subscribe(x=> this.currentUser = x);
      this.isAdmin = this.currentUser.roles.includes("admin");
   }

  ngOnInit(): void {
    if(!this.currentUser) 
        this.router.navigate(['/home'])
    else {
    this.label="Role";
    this.loadData();
    }
  }
  loadData() {
     this.roleService.getAllRoles()
                      .subscribe(data=> {this.roleList =data;},
                        (error:HttpErrorResponse) => {
                          console.log(error.name + ' '+ error.message); 
                        })
  }

}
