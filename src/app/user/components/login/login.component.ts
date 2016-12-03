import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../app-auth.service";
import {Router} from "@angular/router";
import {CookieService} from "angular2-cookie/services/cookies.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(public authService: AuthService,
              private formBuilder:FormBuilder,
              private cookieService:CookieService,
              public router: Router) {

  }
  ngOnInit():any {
    var username = '', password = '';
    if(this.cookieService.get('username'))
      username = this.cookieService.get('username');
    if(this.cookieService.get('password'))
      password = this.cookieService.get('password');
    this.loginForm = this.formBuilder.group({
      username: [username, [Validators.required]],
      password: [password, Validators.required]
    });

    if(this.cookieService.get('username') && this.cookieService.get('password')){
      this.onLogin();
    }
    /*    this.loginForm.valueChanges
     .subscribe((data: any) => {
     console.log("valueChanges")
     console.info(data)
     console.info(this.loginForm)
     }
     );*/
  }

  onLogin() {
    this.authService.login(this.loginForm.value)
      .subscribe(response => {
        /**
         * @param response              Information about the object.
         * @param response.isLoggedIn   Information about the object's members.
         */
        if(response.isLoggedIn){

          this.cookieService.put('username',this.loginForm.value.username);
          this.cookieService.put('password',this.loginForm.value.password);
          this.authService.isLoggedIn = true;
          localStorage.setItem('loggedUsername', response.username);
          this.router.navigate(['']);
        }
        else{
          this.router.navigate(['/login']);
        }
      });
  }
  /*
   logout() {
   this.authService.logout();
   }

   goToResetPassword(){
   this.router.navigate(['/reset-password']);
   }
   goToSignup(){
   this.router.navigate(['/signup']);
   }*/


}
