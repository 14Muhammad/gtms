import { BrowserModule } from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {TodoModule} from "./todo/todo.module";
import {UserModule} from "./user/user.module";
import {AppRoutingModule} from "./app-routing.module";
import {CookieService} from "angular2-cookie/services/cookies.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TodoModule,
    UserModule,
    AppRoutingModule
    //routing
  ],
  providers: [
    CookieService
  ],
  bootstrap: [
    AppComponent
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
