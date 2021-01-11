import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserMapper } from '../mappers/user.mapper';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:8080/users";
  private user =null;
  private  headers =  null;
  constructor(private userHttp:HttpClient,private mapper:UserMapper, private loginService:LoginService) { 
    this.user = this.loginService.currentUserValue;
    this.headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Authorization','Basic ' + btoa( this.user.username + ':' +this.user.password))
    .set('Access-Control-Allow-Origin','http://localhost:4200')
    .set( 'Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    
  }
  getAllUsers() {
    return this.userHttp.get<User[]>(this.url,{headers: this.headers});
  }
  getFilteredUsers(allUsers:any[],exculedUsers:any[]) {
    return allUsers.filter(x=> !exculedUsers.find(rm =>(rm.id == x.id)));
  }
  getUserById(id:number) {
    const endpoint = this.url +'/' + id;
    return this.userHttp.get<User>(endpoint,{headers: this.headers});
  }
  addNewUser(user:User) {

    return this.userHttp.post<User>(this.url,this.mapper.mapUser(user),{headers: this.headers});
  }
  updateUser(user:User) {
    const endpoint = this.url +'/' + user.id;
    return this.userHttp.put<User>(endpoint,this.mapper.mapUser(user),{headers: this.headers});
  }
  deleteUser(id:number) {
    const endpoint = this.url +'/' + id;
    return this.userHttp.delete<User>(endpoint, {headers: this.headers});
  }
}
