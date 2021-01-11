import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { error } from 'protractor';
import { LoginUser } from '../models/loginUser.model';
import { User } from '../models/user.model';
import { ConfirmDialogService } from '../services/confirm-dialog.service';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.css']
})
export class NewUserFormComponent implements OnInit {
  @Input() options:User;
  @Input() modal:NgbModalRef;
  private userId:number;
  managerList:User[];
  currentUser:LoginUser;
  isAdmin:boolean = false;
  isPasswordMatched:boolean = null;
  private errorMessages:string[] = [];
  errorMsg: string;
  readonly usernameRegex:RegExp = /[a-zA-Z0-9]{6,30}/gm;
  readonly passwordRegex:RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/gm;
  readonly emailRegex:RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/gm;
  userForm = new FormGroup({
    id:new FormControl({value:'',disabled:true}),
    username: new FormControl('',[Validators.required,Validators.pattern(this.usernameRegex),Validators.minLength(6),Validators.maxLength(30)]),
    firstName: new FormControl('',[Validators.required,Validators.maxLength(30),  Validators.minLength(2)]),
    middleName: new FormControl('',[Validators.required,Validators.maxLength(30), Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required,Validators.maxLength(30), Validators.minLength(2)]),
    email: new FormControl ('',[Validators.required,Validators.email, Validators.pattern(this.emailRegex)]),
    manager: new FormControl(null),
    groups:new FormControl([]),
    password:new FormControl('', [Validators.required,Validators.pattern(this.passwordRegex),Validators.maxLength(50)]),
    confirmPassword:new FormControl(''),
    active:new FormControl({value:true,disabled:true})
  });

  constructor(private userService:UserService, private loginService:LoginService, private router:Router, private confirmDialogService:ConfirmDialogService) {
    this.loginService.currentUser.subscribe(x=> this.currentUser =x);
    this.isAdmin = this.currentUser.roles.includes("admin");
   }

  ngOnInit(): void {
    if(!this.currentUser)
        this.router.navigate(['/login'])
    else {
      this.userForm.get('password').valueChanges.subscribe(password=>{
        var confirmPassword = this.userForm.getRawValue().confirmPassword;
        if(password && confirmPassword) 
          this.isPasswordMatched = this.comparePasswords(password, confirmPassword);
        else
        this.isPasswordMatched = null;
    });
    this.userForm.get('confirmPassword').valueChanges.subscribe(confirmPassword=>{
      var password = this.userForm.getRawValue().password;
      if(password && confirmPassword) 
        this.isPasswordMatched =  this.comparePasswords(password, confirmPassword);
      else
        this.isPasswordMatched = null;
  });
      this.loadAllManagers();
    if(this.options) 
    this.userForm.patchValue({
      id:this.options.id,
      username: this.options.username,
      firstName:this.options.firstName,
      middleName:this.options.middleName,
      lastName:this.options.lastName,
      email:this.options.email,
      manager:this.options.manager,
      groups: this.options.groups,
      password:this.currentUser.password,
      active:this.options.active
    })
    
    }
  }

  loadAllManagers() {
    this.userService.getAllUsers()
     .subscribe(data=> {
       this.managerList =data;
      },
      (error:HttpErrorResponse) => {
        console.log(error.name + ' '+ error.message); 
      })
  }
  private onSubmitValidation() {
    this.errorMsg = '';
    this.errorMessages = [];  
        
  var isFormValid = true;
  var userForm = this.userForm.getRawValue();
  var usernameRegexCheck = userForm.username.match(this.usernameRegex);
  var passwordRegexCheck = userForm.password.match(this.passwordRegex);
  var emailRegexCheck = userForm.email.match(this.emailRegex);
  
  if(!userForm.username || (!usernameRegexCheck) || userForm.username.length > 30 || userForm.username.length < 6) {
     isFormValid = false;
     this.errorMessages.push('Username');
  }
  if(!userForm.firstName || userForm.firstName.length > 30 || userForm.firstName.length < 2) {
    isFormValid = false;
    this.errorMessages.push("First Name");
  }
  if(!userForm.middleName || userForm.middleName.length > 30 || userForm.middleName.length < 2) {
    isFormValid = false;
    this.errorMessages.push("Middle Name");
  }
  if(!userForm.lastName || userForm.lastName.length > 30 || userForm.lastName.length < 2) {
    isFormValid = false;
    this.errorMessages.push("Last Name");
  }

  if(!userForm.email || (!emailRegexCheck)) {
    console.log('Test')
    isFormValid = false;
    this.errorMessages.push("Email");
  }
  if(!userForm.password || (!passwordRegexCheck)) {
    isFormValid = false;
    this.errorMessages.push("Password");
  }
  if(!userForm.confirmPassword || !this.isPasswordMatched) {
    isFormValid = false;
    this.errorMessages.push("Confirm Password");
  }
  return isFormValid;
}
  onSubmit() {
    var isFormValid = this.onSubmitValidation();
    if(isFormValid) {
      this.errorMessages = [];
      this.errorMsg = '';
        this.userService.addNewUser(this.userForm.getRawValue())
                    .subscribe(data=>{
                         if(data) 
                         this.router.navigate(['/userList']);
                    }, (error:HttpErrorResponse) => {
                      console.log(error.name + ' '+ error.message); 
                    });
                  }
      else
        this.errorMsg = 'The following fields are mandatory fields and must contain valid data: ' + this.errorMessages.join(',');
    
  }
  updateUser() {
    var isFormValid = this.onSubmitValidation();
    if(isFormValid) {
                this.userService.updateUser(this.userForm.getRawValue())
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
  deleteUser() {
    this.confirmDialogService.confirm('Confirmation', 'Do you really want to delete it ?')
   .then((confirmed) => {
     if(confirmed)
         this._deleteUser();
   })
   .catch(() =>{ return false;});
  }
  private _deleteUser() {
    this.userService.deleteUser(this.userForm.getRawValue().id)
                    .subscribe(data => {
                               if(!data) {
                                   this.modal.close('Cross Click');
                                   this.reloadPage(this.router);
                                  }
                             }, (error:HttpErrorResponse) => {
                                console.log(error.name + ' '+ error.message); 
                     })
    
  }
  private comparePasswords(password:string, confirmPassword:string) {
    return (password === confirmPassword);
  }
  
  private reloadPage(router:Router) {
    router.navigateByUrl('/', {skipLocationChange: true})
    .then(() => router.navigate(['/userList']));
  }
}
