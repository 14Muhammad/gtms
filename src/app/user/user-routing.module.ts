import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }    from './components/login/login.component';
import { SignupComponent }    from './components/signup/signup.component';
import { ForgetPasswordComponent }    from './components/forget-password/forget-password.component';

const userRoutes: Routes = [
  { path: 'login',  component: LoginComponent },
  { path: 'forget-password', component: ForgetPasswordComponent},
  { path: 'signup', component:SignupComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
