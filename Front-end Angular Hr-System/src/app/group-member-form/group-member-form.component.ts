import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupMapper } from '../mappers/group.mapper';
import { Group } from '../models/group.model';
import { LoginUser } from '../models/loginUser.model';
import { User } from '../models/user.model';
import { ConfirmDialogService } from '../services/confirm-dialog.service';
import { GroupService } from '../services/group.service';
import { LoginService } from '../services/login.service';
import { RoleService } from '../services/role.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-group-member-form',
  templateUrl: './group-member-form.component.html',
  styleUrls: ['./group-member-form.component.css']
})
export class GroupMemberFormComponent implements OnInit {
  @Input() options:any;
  action:string;
  currentUser:LoginUser;
  isAdmin:boolean = false;
  groupsList:Group[];
  groupMembersList:User[];
  private errorMessages:string[] = [];
  private errorMsg:string;
  groupMemberForm = new FormGroup({
    group:new FormControl('', [Validators.required]),
    groupMember:new FormControl('', [Validators.required])
  })
  
  constructor(private groupService:GroupService,private userService:UserService,private loginService:LoginService,private mapper:GroupMapper,private roleService:RoleService, private router:Router,private confirmDialogService:ConfirmDialogService) {
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

  loadGroupMembers(event):void {
    var group = this.groupMemberForm.getRawValue().group;
    if(this.action == 'add') {
         this.loadAvailableGroupMembers(group); 
    }
    else if(this.action == 'delete')
        this.groupMembersList = group.users;
  }

  loadGroups() {
    this.groupService.getAllGroups()
    .subscribe(data=> {
      this.groupsList = this.mapper.mapToDtoList(data,this.userService,this.roleService,false);
     },
     (error:HttpErrorResponse) => {
       console.log(error.name + ' '+ error.message); 
     })
  }

  private onSubmitValidation() {
    this.errorMsg = '';
    this.errorMessages = [];  
       
  var isFormValid = true;
  var groupMemberForm = this.groupMemberForm.getRawValue();

  if(!groupMemberForm.group) {
     isFormValid = false;
     this.errorMessages.push('Group');
  }

  if(!groupMemberForm.groupMember) {
    isFormValid = false;
    this.errorMessages.push('Group Member');
 }
  
  return isFormValid;
}

  private loadAvailableGroupMembers(group) {
      return this.userService.getAllUsers()
                             .subscribe(data=> {
                               if(data)
                                  this.groupMembersList =this.userService.getFilteredUsers(data,group.users);
                              },
                              (error:HttpErrorResponse) => {
                                console.log(error.name + ' '+ error.message); 
                             }) 
  }

  addMember() {
    var isFormValid = this.onSubmitValidation();
    if(isFormValid) {
        const groupMemberForm = this.groupMemberForm.getRawValue();
        this.groupService.addNewGroupMember(groupMemberForm.groupMember.id, groupMemberForm.group.id)
                          .subscribe(data=> {
                            if(data)
                                    this.router.navigate(['/groupList']);
                          },
                          (error:HttpErrorResponse) => {
                                  console.log(error.name + ' '+ error.message); 
                        })
    } else
      this.errorMsg = 'The following fields are mandatory fields and must not be empty: ' + this.errorMessages.join(',');
  }

  deleteMember() {
    var isFormValid = this.onSubmitValidation();
    if(isFormValid) {
      this.confirmDialogService.confirm('Confirmation', 'Do you really want to delete it ?')
      .then((confirmed) => {
        if(confirmed)
            this.deleteGroupMember();
      })
      .catch(() =>{ return false;});
    } else 
      this.errorMsg = 'The following fields are mandatory fields and must not be empty: ' + this.errorMessages.join(',');
  }

  private deleteGroupMember() {
    const groupMemberForm = this.groupMemberForm.getRawValue();
    this.groupService.deleteGroupMember(groupMemberForm.groupMember.id, groupMemberForm.group.id)
                      .subscribe(data=> {
                    if(data)
                        this.router.navigate(['/groupList']);
                    },
                    (error:HttpErrorResponse) => {
                      console.log(error.name + ' '+ error.message); 
                    })
  }
}
