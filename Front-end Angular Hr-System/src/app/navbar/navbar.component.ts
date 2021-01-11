import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from '../models/loginUser.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser:LoginUser = null;
  isAdmin:boolean = false;
  isUser:boolean = false;
  constructor( public loginService:LoginService, private router:Router) { 
    
    this.loginService.currentUser.subscribe(x=> {
      this.currentUser = x;
      this.isAdmin = this.currentUser.roles.includes("admin");
      this.isUser = this.currentUser.roles.includes("user");
    })
  }

  ngOnInit(): void {
    console.log('OnInit');
    
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
