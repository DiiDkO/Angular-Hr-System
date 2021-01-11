import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LeaveType } from '../models/leaveType.model';
import { LoginUser } from '../models/loginUser.model';
import { ConfirmDialogService } from '../services/confirm-dialog.service';
import { LeaveTypeService } from '../services/leave-type.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-new-leave-type-form',
  templateUrl: './new-leave-type-form.component.html',
  styleUrls: ['./new-leave-type-form.component.css']
})
export class NewLeaveTypeFormComponent implements OnInit {
  @Input() options:LeaveType;
  @Input() modal: NgbModalRef;
  
  mySubscription:any;
  currentUser:LoginUser;
  isAdmin:boolean = false;
  private errorMessages:string[] = [];
  private errorMsg:string;
  isLeaveTypeValid = null;
  private readonly leaveTypeRegex:RegExp = /^[a-zA-Z\s_-]{2,80}$/gm;
  leaveTypeForm = new FormGroup({
    id: new FormControl({value:'', disabled:true}),
    name: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(80)])
  })
  private newLeaveType:LeaveType;
  constructor(private leaveTypeService:LeaveTypeService, private loginService:LoginService, private router:Router, private confirmDialogService:ConfirmDialogService) {
    this.loginService.currentUser.subscribe(x=> this.currentUser =x);
    this.isAdmin = this.currentUser.roles.includes("admin");
   }

  ngOnInit(): void {
    if(!this.currentUser)
        this.router.navigate(['/login'])
    else {
      this.leaveTypeForm.get('name').valueChanges.subscribe(name=> {
        var regexMatch = name.match(this.leaveTypeRegex);
              if(regexMatch != null)
                  this.isLeaveTypeValid = true;
               else
                  this.isLeaveTypeValid = false;
     });
     if(this.options)
      this.leaveTypeForm.patchValue({
          id:this.options.id,
          name: this.options.name
      });
    }
  }
 
  onSubmit() {
    var isFormValid = this.onSubmitValidation();
    if(isFormValid) {
          this.leaveTypeService.addNewLeaveType(this.leaveTypeForm.getRawValue())
                                .subscribe(data => {
                                        this.newLeaveType = data;
                                        if(this.newLeaveType.id)
                                              this.router.navigate(['/leaveTypeList'])
                                    }, 
                                    (error:HttpErrorResponse) => {
                                            console.log(error.name + ' '+ error.message); 
                                    })
    } else 
    this.errorMsg = 'The following fields are mandatory fields and must contain valid data: ' + this.errorMessages.join(',');
  }
  private onSubmitValidation() {
    this.errorMsg = '';
    this.errorMessages = [];  
       
  var isFormValid = true;
  var leaveTypeForm = this.leaveTypeForm.getRawValue();
  var nameRegexCheck = leaveTypeForm.name.match(this.leaveTypeRegex);
    
  if(!leaveTypeForm.name || (!nameRegexCheck) || leaveTypeForm.name.length > 80 || leaveTypeForm.name.length < 2) {
     isFormValid = false;
     this.errorMessages.push('Leave Type');
  }

  return isFormValid;
}

  updateLeaveType() {
    var isFormValid = this.onSubmitValidation();
    if(isFormValid) {
          this.leaveTypeService.updateLeaveType(this.leaveTypeForm.getRawValue())
                                .subscribe(data => {
                                            if(data) {
                                                this.modal.close('Cross Click');
                                                this.leaveTypeService.reloadPage(this.router)
                                            }
                                  }, 
                                  (error:HttpErrorResponse) => {
                                          console.log(error.name + ' '+ error.message); 
                                  });
    } else
        this.errorMsg = 'The following fields are mandatory fields and must contain valid data: ' + this.errorMessages.join(',');
    
  }
  deleteLeaveType() {
    this.confirmDialogService.confirm('Confirmation', 'Do you really want to delete it ?')
   .then((confirmed) => {
     if(confirmed)
         this._deleteLeaveType();
   })
   .catch(() =>{ return false;});
  }
  private _deleteLeaveType() {
    this.leaveTypeService.deleteLeaveType(this.leaveTypeForm.getRawValue().id)
    .subscribe(data => {
      if(!data) {
        this.modal.close('Cross Click');
        this.leaveTypeService.reloadPage(this.router)
      }
    }, 
    (error:HttpErrorResponse) => {
      console.log(error.name + ' '+ error.message); 
    });
  }
  
}
