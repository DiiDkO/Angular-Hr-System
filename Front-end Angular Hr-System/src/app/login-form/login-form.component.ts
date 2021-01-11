import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginUser } from '../models/loginUser.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Output() loginEvent:EventEmitter<any> =new EventEmitter<object>();
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  user:LoginUser;
  constructor(private loginService:LoginService,private router: Router) {
    if (this.loginService.currentUserValue) { 
      this.router.navigate(['/']);
    }
   }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      username: new FormControl('',  Validators.required),
      password: new FormControl('',Validators.required)
  });
  }
    onSubmit() {
    this.submitted = true;
    const loginForm = this.loginForm.getRawValue();
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.loading = true;
   
   this.loginService.login(loginForm.username, loginForm.password).pipe(first())
                   .subscribe(data => {
                              if(data.valid) {
                                  this.router.navigate(['/home']);
                              } else {
                                 this.loading = false;
                                 this.submitted = false;
                              }
                          },(error:HttpErrorResponse) => {
                                this.loading = false;
                                this.submitted = false;
                        });
                        
    }
 
}
