import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../models/role.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
 
  private url = "http://localhost:8080/roles"
  private headers =null;
  private user = null;
  constructor(private httpClient:HttpClient, private loginService:LoginService ) { 
    this.user = this.loginService.currentUserValue;
    this.headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Authorization','Basic ' + btoa( this.user.username + ':' +this.user.password))
    .set('Access-Control-Allow-Origin','http://localhost:4200')
    .set( 'Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  }
  getAllRoles() {
    return this.httpClient.get<Role[]>(this.url,{headers:this.headers});
  }
  getFilteredRoles(roleList, exculedRoles) {
    console.log(exculedRoles);
    return roleList.filter(x=> !exculedRoles.find(rm =>(rm.id == x.id)));
  }
  getRoleById(id:number) {
    const endpoint = this.url + '/' + id;
    return this.httpClient.get<Role>(endpoint, {headers:this.headers});
  } 
  addNewRole(role:Role) {
    return this.httpClient.post<Role>(this.url,{name:role.name}, {headers:this.headers});
  }
  updateRole(role:Role) {
    const endpoint = this.url + '/' + role.id;
    return this.httpClient.put<Role>(endpoint,{name:role.name}, {headers:this.headers});
  }
  deleteRole(id:number) {
    const endpoint = this.url + '/' + id;
    return this.httpClient.delete(endpoint, {headers:this.headers});
  }
}