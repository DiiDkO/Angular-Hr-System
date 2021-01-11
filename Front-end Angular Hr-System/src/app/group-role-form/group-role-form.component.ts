import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupMapper } from '../mappers/group.mapper';
import { Group } from '../models/group.model';
import { LoginUser } from '../models/loginUser.model';
import { Role } from '../models/role.model';
import { ConfirmDialogService } from '../services/confirm-dialog.service';
import { GroupService } from '../services/group.service';
import { LoginService } from '../services/login.service';
import { RoleService } from '../services/role.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-group-role-form',
  templateUrl: './group-role-form.component.html',
  styleUrls: ['./group-role-form.component.css']
})
export class GroupRoleFormComponent implements OnInit {
  @Input() options:Group;
  action:string;
  currentUser:LoginUser;
  isAdmin:boolean = false;
  groupsList:Group[];
  groupRolesList:Role[];
  private errorMessages:string[] = [];
  private errorMsg:string;
  groupRoleForm = new FormGroup({
    group:new FormControl(''),
    groupRole:new FormControl('')
  })
  constructor(private groupService:GroupService, private roleService:RoleService, private loginService:LoginService,private userService:UserService,private mapper:GroupMapper, private router:Router, private confirmDialogService:ConfirmDialogService) {
      this.loginService.currentUser.subscribe(x => this.currentUser =x);
      this.isAdmin = this.currentUser.roles.includes("admin");
      this.action= this.router.getCurrentNavigation().extras.state.action;
   }

  ngOnInit(): void {
    if(!this.currentUser)
      this.router.navigate(['/login']);
      else {
        this.loadGroups();
      }
  }
  private loadGroups() {
    this.groupService.getAllGroups()
                     .subscribe(data=> {
                               this.groupsList = this.mapper.mapToDtoList(data,this.userService,this.roleService,false);
                      },
                      (error:HttpErrorResponse) => {
                             console.log(error.name + ' '+ error.message); 
                      })
   }

  loadGroupRoles(event):void {
    var group = this.groupRoleForm.getRawValue().group;
    if(this.action == 'add') {
        this.loadAvailableGroupRoles(group);
    }
    else if(this.action == 'delete')
        this.groupRolesList = group.roles;
  }

  private loadAvailableGroupRoles(group) {
    return this.roleService.getAllRoles()
                .subscribe(data=> {
                  console.log(data);
                          if(data)
                             this.groupRolesList =this.roleService.getFilteredRoles(data,group.roles);
                 },
                 (error:HttpErrorResponse) => {
                              console.log(error.name + ' '+ error.message); 
                 })
  }

  private onSubmitValidation() {
    this.errorMsg = '';
    this.errorMessages = [];  
       
  var isFormValid = true;
  var groupRoleForm = this.groupRoleForm.getRawValue();

  if(!groupRoleForm.group) {
     isFormValid = false;
     this.errorMessages.push('Group');
  }

  if(!groupRoleForm.groupRole) {
    isFormValid = false;
    this.errorMessages.push('Group Role');
 }
  
  return isFormValid;
}
  addRole() {
    var isFormValid = this.onSubmitValidation();
    if(isFormValid) {
            const groupRoleForm = this.groupRoleForm.getRawValue();
            this.groupService.addNewGroupRole(groupRoleForm.groupRole.id, groupRoleForm.group.id)
                             .subscribe(data => {
                                        if(data && data.id)
                                            this.router.navigate(['/groupList']);
                                        }, 
                                        (error:HttpErrorResponse) => {
                                            console.log(error.name + ' ' + error.error );
                                        });
    } else
        this.errorMsg = 'The following fields are mandatory fields and must not be empty: ' + this.errorMessages.join(',');
  }

  deleteRole() {
    var isFormValid = this.onSubmitValidation();
    if(isFormValid) {
      this.confirmDialogService.confirm('Confirmation', 'Do you really want to delete it ?')
      .then((confirmed) => {
        if(confirmed)
            this.deleteGroupRole();
      })
      .catch(() =>{ return false;});
    } else 
        this.errorMsg = 'The following fields are mandatory fields and must not be empty: ' + this.errorMessages.join(',');
  }
  
  private deleteGroupRole() {
    const groupRoleForm = this.groupRoleForm.getRawValue();
    this.groupService.deleteGroupRole(groupRoleForm.groupRole.id, groupRoleForm.group.id)
               .subscribe(data => {
                       if(data && data.id)
                           this.router.navigate(['/groupList']);
               }, 
               (error:HttpErrorResponse) => {
                   console.log(error.name + ' ' + error.error );
               });
  }
}
