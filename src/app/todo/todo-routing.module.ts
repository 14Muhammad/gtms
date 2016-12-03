import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoComponent }    from './components/todo/todo.component';
import {AuthGuard} from "../app-auth.gaurd";


const todoRoutes: Routes = [
  { path: '',  component: TodoComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(todoRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TodoRoutingModule { }
