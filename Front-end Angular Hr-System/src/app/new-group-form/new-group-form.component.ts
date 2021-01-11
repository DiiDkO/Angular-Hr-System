import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { GroupService } from '../services/group.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Group } from '../models/group.model';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoginUser } from '../models/loginUser.model';
import { LoginService } from '../services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { group } from '@angular/animations';
import { ConfirmDialogService } from '../services/confirm-dialog.service';
@Component({
  selector: 'app-new-group-form',
  templateUrl: './new-group-form.component.html',
  styleUrls: ['./new-group-form.component.css']
})
export class NewGroupFormComponent implements OnInit {
 @Input() options:any;
 @Input() modal: NgbModalRef;
  currentUser:LoginUser;
  isAdmin:boolean = false;
  private groupId:number;
  managerList:User[];
  private errorMessages:string[] = [];
  private errorMsg:string;
  isGroupValid = null;
  private readonly groupRegex:RegExp = /^[a-zA-Z0-9\s_-]{2,80}$/gm;
  private readonly emailRegex:RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/gm;
  groupForm = new FormGroup({
    id: new FormControl({value:'',disabled:true}),
    name: new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(80)]),
    email: new FormControl('',[Validators.required,Validators.email,Validators.pattern(this.emailRegex)]),
    manager: new FormControl(''),
    roles: new FormControl([]),
    members: new FormControl([])

  });
  constructor(private userService:UserService, private groupService:GroupService,private loginService:LoginService, private router: Router, private confirmDialogService:ConfirmDialogService) {
    this.loginService.currentUser.subscribe(x=> this.currentUser =x);
    this.isAdmin = this.currentUser.roles.includes("admin");
   }

  ngOnInit(): void {
    if(!this.currentUser)   
      this.router.navigate(['/login'])
    else {
      this.loadAllManagers();
      this.groupForm.get('name').valueChanges.subscribe(name=> {
        var regexMatch = name.match(this.groupRegex);
              if(regexMatch != null)
                  this.isGroupValid = true;
               else
                  this.isGroupValid = false;
     });
      if(this.options) 
          this.groupForm.patchValue({
            id: this.options.id,
            name: this.options.name,
            email: this.options.email,
            manager: this.options.manager,
            roles: this.options.roles,
            members: this.options.users
          })      
    }
  }
  loadAllManagers() {
    this.userService.getAllUsers()
     .subscribe(data=> {
       this.managerList =data;},
      (error:HttpErrorResponse) => {
        console.log(error.name + ' '+ error.message); 
      })
  }
  private onSubmitValidation() {
    this.errorMsg = '';
    this.errorMessages = [];  
       
  var isFormValid = true;
  var groupForm = this.groupForm.getRawValue();
  var nameRegexCheck = groupForm.name.match(this.groupRegex);
  var emailRegexCheck = groupForm.email.match(this.emailRegex);

  if(!groupForm.name || (!nameRegexCheck || !nameRegexCheck[0]) || groupForm.name.length > 80 || groupForm.name.length < 2) {
     isFormValid = false;
     this.errorMessages.push('Group');
  }

  if(!groupForm.email || (!emailRegexCheck)) {
    isFormValid = false;
     this.errorMessages.push('Email');
  }
  
  return isFormValid;
}
  onSubmit() {
    var isFormValid = this.onSubmitValidation();
    if(isFormValid) {
    this.groupForm.patchValue({id:this.groupId});
    this.groupService.addNewGroup(this.groupForm.getRawValue())
                       .subscribe(data => {
                               if(data && data.id) 
                               this.router.navigate(['/groupList']);
                             }, (error:HttpErrorResponse) => {
                                console.log(error.name + ' '+ error.message); 
                     })
    } else 
        this.errorMsg = 'The following fields are mandatory fields and must contain valid data: ' + this.errorMessages.join(',');
  }
  updateGroup() {
    var isFormValid = this.onSubmitValidation();
    if(isFormValid) {
            this.groupService.updateGroup(this.groupForm.getRawValue())
                              .subscribe(data => {
                                    if(data && data.id) {
                                        this.modal.close('Cross Click');
                                        this.reloadPage(this.router);
                                    }
                              }, (error:HttpErrorResponse) => {
                                console.log(error.name + ' '+ error.message); 
                     })
    } else 
        this.errorMsg = 'The following fields are mandatory fields and must contain valid data: ' + this.errorMessages.join(',');
  }
  deleteGroup() {
    this.confirmDialogService.confirm('Confirmation', 'Do you really want to delete it ?')
    .then((confirmed) => {
      if(confirmed)
          this._deleteGroup();
    })
    .catch(() =>{ return false;});
  }
  private _deleteGroup() {
    this.groupService.deleteGroup(this.groupForm.getRawValue().id)
                     .subscribe(data => {
                               if(!data) {
                                   this.modal.close('Cross Click');
                                   this.reloadPage(this.router);
                                  }
                             }, (error:HttpErrorResponse) => {
                                console.log(error.name + ' '+ error.message); 
                     })
  }
  private reloadPage(router:Router) {
    router.navigateByUrl('/', {skipLocationChange: true})
    .then(() => router.navigate(['/groupList']));
  }
}
