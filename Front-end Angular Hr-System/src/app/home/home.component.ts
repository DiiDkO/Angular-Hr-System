import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from '../models/loginUser.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser:LoginUser;
  constructor(private loginService:LoginService, private router:Router) { 
    this.loginService.currentUser.subscribe(x=> this.currentUser =x);
  }

  ngOnInit(): void {
    if(!this.currentUser)
      this.router.navigate(['/login']);
  }

}
