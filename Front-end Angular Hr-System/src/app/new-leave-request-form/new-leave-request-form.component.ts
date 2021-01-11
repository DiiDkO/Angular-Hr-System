import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserMapper } from '../mappers/user.mapper';
import { LeaveRequest } from '../models/leaveRequest.model';
import { LeaveType } from '../models/leaveType.model';
import { LoginUser } from '../models/loginUser.model';
import { User } from '../models/user.model';
import { LeaveRequestService } from '../services/leave-request.service';
import { LeaveTypeService } from '../services/leave-type.service';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-new-leave-request-form',
  templateUrl: './new-leave-request-form.component.html',
  styleUrls: ['./new-leave-request-form.component.css']
})
export class NewLeaveRequestFormComponent implements OnInit {
  userList:User[];
  leaveTypeList:LeaveType[];
  requestor:string;
  requestedDays:number;
  isBtnDisabled:boolean;
  currentUser:LoginUser;
  private leaveRequestId:number;
  errorMsg:string = '';
  private errorMessages:string[] = [];
  invalidStartDate:boolean;
  invalidEndDate:boolean;
  @Input() options:LeaveRequest;
  @Input() modal:NgbModalRef;
  leaveRequestForm = new FormGroup({
    id: new FormControl({value:'', disabled:true}),
    startDate:new FormControl('', [Validators.required,]),
    endDate: new FormControl('', [Validators.required]),
    requestedDays: new FormControl({value:'',disabled:true}),
    leaveType: new FormControl('', [Validators.required]), 
    status: new FormControl('Requested', [Validators.required]),
    requestor: new FormControl('', [Validators.required]),
    approver: new FormControl({value:'',disabled:true})
  });
  
  constructor(private userService:UserService,private leaveRequestService:LeaveRequestService,private leaveTypeService:LeaveTypeService, private loginService:LoginService,private userMapper:UserMapper, private router:Router) {
    this.loginService.currentUser.subscribe(x=> this.currentUser =x);
   }

  ngOnInit(): void {
    if(!this.currentUser)
        this.router.navigate(['/login'])
      else {
    this.leaveRequestForm.get('startDate').valueChanges.subscribe(startDate=>{
        var endDate = this.leaveRequestForm.getRawValue().endDate;
         this.calculateRequestedDays(startDate, endDate);
        if(this.requestedDays < 1 && endDate.day)
            this.invalidStartDate = true;
          else {
            this.invalidStartDate = false;
            this.invalidEndDate = false;
          }
    });
    this.leaveRequestForm.get('endDate').valueChanges.subscribe(endDate=>{
      var startDate = this.leaveRequestForm.getRawValue().startDate;
        this.calculateRequestedDays(startDate, endDate);
        if(this.requestedDays < 1 && startDate.day)
            this.invalidEndDate = true;
          else {
            this.invalidEndDate = false;
            this.invalidStartDate = false;
          }
    });

    this.isBtnDisabled = false;
    this.requestedDays = 0;
    this.loadAllUsers();
    this.loadAllLeaveTypes();

    if(this.options) {
      
      this.isBtnDisabled = true;
      this.leaveRequestForm.reset({
        id:{value:this.options.id, disabled:true},
        startDate:{value:this.dateToObject(this.options.startDate), disabled:true},
        endDate:{value:this.dateToObject(this.options.endDate),disabled: true},
        requestedDays: this.options.requestedDays,
        leaveType: {value:this.options.leaveType.name, disabled:true,},
        status: {value:this.options.status, disabled:true},
        requestor: {value:this.options.requestor.firstName + ' ' + this.options.requestor.lastName, disabled:true},
        approver: {value:this.options.approver.firstName + ' ' + this.options.approver.lastName, disabled:true}
      });
      console.log(this.leaveRequestForm);

    } 
      }
  }
  loadAllLeaveTypes() {
    this.leaveTypeService.getAllLeaveTypes()
                         .subscribe(data=> {
                           this.leaveTypeList = data;
                          },
                          (error:HttpErrorResponse) => {
                            console.log(error.name + ' ' + error.error);
                        });
  }

  loadAllUsers() {
     this.userService.getAllUsers()
                    .subscribe(data=> {
                       this.userList = this.userMapper.mapList(data, this.userService);
                    },
                    (error:HttpErrorResponse) => {
                       console.log(error.name + ' '+ error.message); 
                    });  
  }

  onChangeUserSelect(event) {
    var leaveRequest = this.leaveRequestForm.getRawValue();
    console.log(leaveRequest)
    this.leaveRequestForm.patchValue({approver:leaveRequest.requestor.manager.firstName + ' ' + leaveRequest.requestor.manager.lastName});
  }
  private onSubmitValidation() {
    this.errorMsg = '';
    this.errorMessages = [];  
        
  var isFormValid = true;
  var leaveRequestForm = this.leaveRequestForm.getRawValue();
  
  if(!leaveRequestForm.startDate || !leaveRequestForm.startDate.day) {
     isFormValid = false;
     this.errorMessages.push('Start Date');
  }
  if(!leaveRequestForm.endDate || !leaveRequestForm.endDate.day) {
    isFormValid = false;
    this.errorMessages.push("End Date");
  }
  if(!leaveRequestForm.leaveType) {
      isFormValid = false;
      this.errorMessages.push("Leave Type");
  }
  if(!leaveRequestForm.requestor) {
    isFormValid = false;
    this.errorMessages.push("Requested For");
  }

  if(this.requestedDays < 1 && leaveRequestForm.startDate.day && leaveRequestForm.endDate.day ) {
        isFormValid = false;
        this.invalidEndDate = true;
        this.invalidStartDate = true;
        this.errorMessages.push('Start Date');
        this.errorMessages.push('End Date');
  }
  return isFormValid;
}
  onSubmit() {
    var isFormValid = this.onSubmitValidation();
    if(isFormValid) {
          var leaveRequestDto = this.getLeaveRequestDto(this.leaveRequestForm.getRawValue());
          this.leaveRequestService.addNewLeaveRequest(leaveRequestDto)
                                  .subscribe(data=> {
                                            if(data && data.id)
                                                this.router.navigate(['/leaveRequestList']);
                                  },
                                    (error:HttpErrorResponse) => {
                                            console.log(error.name + ' '+ error.message); 
                                  });  
    } else 
        this.errorMsg = 'The following fields are mandatory fields and must not be empty: ' + this.errorMessages.join(',');
  }

  updateLeaveRequest(event) {
    var buttonId = event.target.id;
    if(buttonId == "approveBtn")
        this.leaveRequestForm.patchValue({status:'Approved'});
    else if(buttonId == 'rejectBtn')
        this.leaveRequestForm.patchValue({status:'Rejected'});
    this.options.status = this.leaveRequestForm.getRawValue().status;
    var leaveRequestDto = this.getTransformedLeaveRequestDto(this.options);
    this.leaveRequestService.updateLeaveRequest(this.options.id,leaveRequestDto)
                            .subscribe(data=> {
                              if(data && data.id) {
                                   this.modal.close('Cross Click');
                                   this.reloadPage(this.router);
                              }
                            },
                            (error:HttpErrorResponse) => {
                                  console.log(error.name + ' '+ error.message); 
                            });
  }

  private calculateRequestedDays(startDate, endDate) {
    if(startDate && endDate) {
     
        const date1 = new Date(startDate.year, startDate.month, startDate.day).getTime()
        const date2 = new Date(endDate.year, endDate.month, endDate.day).getTime()

        if(date1 <= date2) {
          const diffTime = Math.abs(date2 - date1);
          const diffDays = Math.ceil(diffTime/(1000*60*60*24)) +1;
          this.requestedDays = diffDays;
        } else {
          this.requestedDays = 0;
        }
    }
  }
  private getTransformedLeaveRequestDto(leaveRequest) {
    var transformedLeaveRequestDto:any = {};
    transformedLeaveRequestDto.startDate = leaveRequest.startDate;
    transformedLeaveRequestDto.endDate =  leaveRequest.endDate;
    transformedLeaveRequestDto.leaveType = this.options.leaveType.id;
    transformedLeaveRequestDto.status = leaveRequest.status
    transformedLeaveRequestDto.requestedDays = this.requestedDays;
    transformedLeaveRequestDto.requestor = this.options.requestor.id;
    transformedLeaveRequestDto.approver = this.options.requestor.manager;
    return transformedLeaveRequestDto;
  }
  private getLeaveRequestDto(leaveRequest) {
    var leaveRequestDto:any = {};
    leaveRequestDto.startDate = this.dateToString(leaveRequest.startDate);
    leaveRequestDto.endDate =  this.dateToString(leaveRequest.endDate);
    leaveRequestDto.leaveType = leaveRequest.leaveType.id;
    leaveRequestDto.status = leaveRequest.status
    leaveRequestDto.requestedDays = this.requestedDays;
    leaveRequestDto.requestor = leaveRequest.requestor.id;
    leaveRequestDto.approver = leaveRequest.requestor.manager.id;
    return leaveRequestDto;
  }
  private dateToString(date) {
      if(date) {
        const year = date.year;
        const month =  date.month;
        const day = date.day;
        if(day && month && year)
        return  year + '-' +  month + '-' + day  ;
      }
  }
  private dateToObject(date) {
    if(date) {
      date = date.split('-');
      return {
        year: Number(date[0]),
        month: Number(date[1]),
        day: Number(date[2])
      }
    }
  }
  private reloadPage(router:Router) {
    router.navigateByUrl('/', {skipLocationChange: true})
    .then(() => router.navigate(['/leaveRequestList']));
  }
}
