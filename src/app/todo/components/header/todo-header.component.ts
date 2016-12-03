import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../app-auth.service";
import {Router} from "@angular/router";
import {CookieService} from "angular2-cookie/services/cookies.service";

@Component({
  selector: 'todo-header',
  templateUrl: 'todo-header.component.html',
  styleUrls: ['todo-header.component.css']
})
export class TodoHeaderComponent implements OnInit {

  loggedUsername:string;
  constructor(public authService: AuthService,
              private cookieService:CookieService,
              private router: Router) { }

  ngOnInit() {
    this.loggedUsername = localStorage.getItem('loggedUsername')
  }

  logout() {
    this.cookieService.remove('username');
    this.cookieService.remove('email');
    this.cookieService.remove('password');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
