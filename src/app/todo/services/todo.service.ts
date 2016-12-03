import { Injectable } from '@angular/core';
import {Headers, Response, Http} from "@angular/http";
import {Observable} from "rxjs/Rx";
import * as moment from 'moment';

import {GlobalConstants} from "../../shared/constants/globals";
import {Todo, TodoList} from "../components/todo/todo";

@Injectable()
export class TodoService {
  private baseApiUrl = GlobalConstants.BASE_API_URL;
  loggedUsername:string;
  public todos: Todo[] = [];
  constructor(private http:Http) {
    this.loggedUsername = localStorage.getItem('loggedUsername');
  }

  public getTodos() : Observable<Todo[]>{
    let todosPath = this.baseApiUrl + 'todos/'+ localStorage.getItem('loggedUsername');
    let todoList = this.http.get(todosPath, {headers: this.getHeaders()})
      .map(res => <Todo[]> res.json())
      .catch(this.handleError);
    return todoList;
  }

  public addTodo(todo: Todo) {
    var addTodoPath = this.baseApiUrl + 'todo/add';
    return this.http.post(addTodoPath, todo,{headers: this.getHeaders()})
      .map((res:Response) => res.json())
      .catch(this.handleError);
  }

  public updateTodo(id, updatedTodo) {
    var updateTodoPath = this.baseApiUrl + 'todo/update/'+id;
    return this.http.put(updateTodoPath, updatedTodo,{headers: this.getHeaders()})
      .map((res:Response) => res.json())
      .catch(this.handleError);
  }

  public deleteTodo(id) {
    var deleteTodoPath = this.baseApiUrl + 'todo/delete/'+id;
    return this.http.delete(deleteTodoPath,{headers: this.getHeaders()})
      .catch(this.handleError);
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  private handleError (error: any) {
    let errorMsg = error.message || ` Problem in Projects retrieving`
    console.error(errorMsg);
    return Observable.throw(errorMsg);
  }

}
