import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { GroupMapper } from '../mappers/group.mapper';
import { Group } from '../models/group.model';
import { LoginUser } from '../models/loginUser.model';
import { GroupService } from '../services/group.service';
import { LoginService } from '../services/login.service';
import { RoleService } from '../services/role.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})


export class GroupListComponent implements OnInit {
  label:string;
  groupList:Group[];
  currentUser:LoginUser;
  isAdmin:boolean = false;
  response:any;
  private  navigationExtracts:NavigationExtras = {
    state: {
      action:''
    }
  };
  constructor(private groupService:GroupService,private roleService:RoleService, private userService:UserService,private loginService:LoginService, private router:Router, private mapper:GroupMapper) {
    this.loginService.currentUser.subscribe(x=> this.currentUser =x);
    this.isAdmin = this.currentUser.roles.includes("admin");
   }

  ngOnInit(): void {
    if(!this.currentUser)
        this.router.navigate(['/login']);
    else {
        this.label = 'Group';
        this.loadData();
    }
  }
  openNewGrMemberForm(event) {
    const btnId = event.target.id;
    if(btnId == 'addGrMemberBtn')
      this.navigationExtracts.state.action = 'add'
    else if(btnId == 'deleteGrMemberBtn')
      this.navigationExtracts.state.action = 'delete'
    this.router.navigate(['/groupMember'], this.navigationExtracts)
  }
  
  openNewGrRoleForm(event) {
    const btnId = event.target.id;
    if(btnId == 'addGrRoleBtn')
      this.navigationExtracts.state.action = 'add'
    else if(btnId == 'deleteGrRoleBtn')
      this.navigationExtracts.state.action = 'delete'
    this.router.navigate(['/groupRole'], this.navigationExtracts)
  }
  loadData() {
   
    this.groupService.getAllGroups()
    .subscribe(data=> {
      this.groupList = this.mapper.mapToDtoList(data,this.userService,this.roleService,false);
     },
     (error:HttpErrorResponse) => {
       console.log(error.name + ' '+ error.message); 
     })
 }
  
}
