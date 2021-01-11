import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { LoginUser } from '../models/loginUser.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public currentUserSubject: BehaviorSubject<LoginUser>;
    public currentUser: Observable<LoginUser>;
  
  constructor(private httpService:HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<LoginUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  private readonly url = "http://localhost:8080/login";
  public get currentUserValue(): LoginUser {
    return this.currentUserSubject.getValue();
  }

  login(username:string, password:string) {
    return this.httpService.post<any>(this.url, { username: username, password: password })
                            .pipe(map( data=> {
                              const loginUser = { id: data.id, username: data.username, password: data.password, roles: data.roles, valid: data.valid };
                              localStorage.setItem('currentUser', JSON.stringify(loginUser));
                              this.currentUserSubject.next(loginUser);
                              return loginUser;
                            }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
