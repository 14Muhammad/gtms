import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../app-auth.service";
import {UserService} from "../../user.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {CookieService} from "angular2-cookie/services/cookies.service";

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(public authService: AuthService,
              public userService: UserService,
              private cookieService:CookieService,
              public router: Router,
              private formBuilder:FormBuilder) {
    this.signupForm = formBuilder.group({
        'email':['',[
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ],this.asyncEmailValidator(this.userService)],
        'username':['',[
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern("^[a-zA-Z0-9]+$")
        ],this.asyncUsernameValidator(this.userService)],
          'password': ['', [
            Validators.required,
            Validators.minLength(6)
          ]]
    });
  }

  ngOnInit() {
  }


  asyncEmailValidator (userService : UserService) {
    return (control: FormControl): Promise<any> | Observable<any> => {
      let promise = new Promise<any>(
        (resolve, reject) => {
          userService.isEmailExists(control.value)
            .subscribe(response => {
              /**
               * @param response              Information about the object.
               * @param response.isEmailExists   Information about the object's members.
               */
              if(response.isEmailExists)
                resolve({'isEmailExists': true});
              else
                resolve(null);
            });
        });
      return promise;
    }
  }

  asyncUsernameValidator(userService : UserService){
    return (control: FormControl): Promise<any> | Observable<any> => {
      let promise = new Promise<any>(
        (resolve, reject) => {
          userService.isUsernameExists(control.value)
            .subscribe(response => {
              /**
               * @param response              Information about the object.
               * @param response.isUsernameExists   Information about the object's members.
               */
              if(response.isUsernameExists)
                resolve({'isUsernameExists': true});
              else
                resolve(null);
            });
        });
      return promise;
    }
  }

  onSignup(){
    console.info(this.signupForm);
    var userForm : any = {
      email:this.signupForm.value.email,
      username:this.signupForm.value.username,
      password:this.signupForm.value.password,
    }
    this.userService.addUser(userForm)
      .subscribe(response => {
        /**
         * @param response              Information about the object.
         * @param response.isSignedUp   Information about the object's members.
         */
        if(response.isSignedUp){
          /*Observable.interval(1000)
            .subscribe(data => {
              this.router.navigate(['/login']);
            })*/

          this.cookieService.put('username',this.signupForm.value.username);
          this.cookieService.put('email',this.signupForm.value.email);
          this.cookieService.put('password',this.signupForm.value.password);

          this.authService.isLoggedIn = true;
          //localStorage.setItem('loggedUser', this.signupForm.value.username);
          localStorage.setItem('loggedUsername', this.signupForm.value.username);
          this.router.navigate(['']);
        }
      });
  }
}
