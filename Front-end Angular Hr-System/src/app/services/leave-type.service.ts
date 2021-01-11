import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { UrlResolver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LeaveType } from '../models/leaveType.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService {
 
  private readonly url = "http://localhost:8080/leave_types";
  private headers = null;
  private user = null;
  constructor(private httpService:HttpClient, private loginService:LoginService) {
    this.user = this.loginService.currentUserValue;
    this.headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Authorization','Basic ' + btoa( this.user.username + ':' +this.user.password))
    .set('Access-Control-Allow-Origin','http://localhost:4200')
    .set( 'Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  }
  
  getAllLeaveTypes() {
    return this.httpService.get<LeaveType[]>(this.url, {headers:this.headers})
  }
  getLeaveTypeById(id:number) {
    const endpoint = this.url + '/' + id;
    return this.httpService.get<LeaveType>(endpoint, {headers:this.headers});
  }
  addNewLeaveType(leaveType:LeaveType) {
    return this.httpService.post<LeaveType>(this.url,{name:leaveType.name}, {headers:this.headers});
  }
  updateLeaveType(leaveType:LeaveType) {
    const endpoint = this.url +'/' + leaveType.id;
    return this.httpService.put<LeaveType>(endpoint,{name:leaveType.name}, {headers:this.headers});
  }
  deleteLeaveType(id:number) {
    const endpoint = this.url +'/' + id;
    return this.httpService.delete<any>(endpoint, {headers:this.headers});
  }
  reloadPage(router:Router) {
    router.navigateByUrl('/', {skipLocationChange: true})
    .then(() => router.navigate(['/leaveTypeList']));
  }
}
