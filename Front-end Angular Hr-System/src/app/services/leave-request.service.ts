import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaveRequest } from '../models/leaveRequest.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {
  private headers = null;
  private user = null;
  private readonly url ='http://localhost:8080/leave_requests';
   
  constructor(private httpService:HttpClient, private loginService:LoginService) {
    this.user = this.loginService.currentUserValue;
    this.headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Authorization','Basic ' + btoa( this.user.username + ':' +this.user.password))
    .set('Access-Control-Allow-Origin','http://localhost:4200')
    .set( 'Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
   }
  getAllLeaveRequest() {
    return this.httpService.get<LeaveRequest[]>(this.url, {headers:this.headers});
  }
  addNewLeaveRequest(leaveRequest:LeaveRequest) {
    return this.httpService.post<LeaveRequest>(this.url,leaveRequest, {headers:this.headers});
  }
  updateLeaveRequest(id:number, leaveRequest:LeaveRequest) {
    const endpoint = this.url + '/' +id;
    return this.httpService.put<LeaveRequest>(endpoint,leaveRequest, {headers:this.headers});
  }

}
