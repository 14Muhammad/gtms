import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoComponent} from "./todo/components/todo/todo.component";


const appRoutes: Routes = [
  { path: 'login', component: TodoComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
