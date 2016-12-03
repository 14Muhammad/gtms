import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

import {VoiceService} from "./services/voice.service";
import {TodoService} from "./services/todo.service";

import {TodoComponent} from "./components/todo/todo.component";
import {TodoHeaderComponent} from "./components/header/todo-header.component";

import {TodoEffectsDirective} from "./directives/todo-effects.directive";
import {NewTodoInputEffectsDirective} from "./directives/new-todo-input-effects.directive";
import {NewTodoRecordButtonDirective} from "./directives/new-todo-record-button.directive";
import {TodoPlayButtonDirective} from "./directives/todo-play-button.directive";
import {HttpModule} from "@angular/http";
import {UserService} from "../user/user.service";
import {AuthService} from "../app-auth.service";
import {AuthGuard} from "../app-auth.gaurd";
import {TodoRoutingModule} from "./todo-routing.module";
import {TodoTextEffectsDirective} from "./directives/todo-text-effects.directive";
import {TodoDeleteButtonDirective} from "./directives/todo-delete-button.directive";
import {NewTodoInputFieldDirective} from "./directives/new-todo-input-field.directive";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    TodoRoutingModule
  ],
  declarations: [
    TodoComponent,
    TodoHeaderComponent,
    TodoEffectsDirective,
    NewTodoInputEffectsDirective,
    NewTodoRecordButtonDirective,
    TodoPlayButtonDirective,
    TodoTextEffectsDirective,
    TodoDeleteButtonDirective,
    NewTodoInputFieldDirective
  ],
  providers:[
    VoiceService,
    TodoService,
    UserService,
    AuthService,
    AuthGuard
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class TodoModule { }
