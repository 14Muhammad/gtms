import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {HttpModule} from "@angular/http";
import { LoginComponent } from './components/login/login.component';
import {UserRoutingModule} from "./user-routing.module";
import {UserService} from "./user.service";
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    UserRoutingModule
  ],
  declarations: [
    LoginComponent,
    ForgetPasswordComponent,
    SignupComponent
  ],
  providers:[
      UserService
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class UserModule { }
