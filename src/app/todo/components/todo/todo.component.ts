import {Component, OnInit} from "@angular/core";
import * as moment from 'moment';
import {Todo, TodoList} from "./todo";
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'app-todo',
  templateUrl: 'todo.component.html',
  styleUrls: ['todo.component.css']
})

export class TodoComponent implements OnInit{
  loggedUsername:string;
  todoList: TodoList[];
  public todos:Todo[];
  constructor(private todoService: TodoService) {
    this.todos = this.todoService.todos;

  }
  ngOnInit(): void {
    this.loggedUsername = localStorage.getItem('loggedUsername');
    this.resetDays();
    this.getTodos();
  }

  private getTodos(){
    this.todoService.getTodos()
      .subscribe(todos => {
        this.todos = todos
        this.fillTodos();
      });
  }

  moveRight(days:number){
    for(var i=0;i<days;i++) {
      var lastDay = this.todoList[this.todoList.length - 1].date;
      var nextDay = moment(lastDay).add(1, 'day');
      this.todoList.shift();
      this.todoList.push(
        new TodoList('column-' + nextDay.format('YYYY-MM-DD'),
          nextDay,
          this.loggedUsername,
          [],
          new Date(),
          new Date())
      );

      /*for(var j=0; j< this.todos.length;j++){
        if(this.todos[j].listId == this.todoList[this.todoList.length-1].id){
          this.todoList[this.todoList.length-1].todos.push(this.todos[j])
        }
      }*/
    }
    this.fillTodos();
  }

  moveLeft(days:number){
    for(var i=0;i<days;i++) {
      console.log(this.todoList);
      var firstDay = this.todoList[0].date;
      var lastDay = moment(firstDay).add(-1, 'day');
      this.todoList.pop();
      console.log(lastDay);
      //console.log(lastDay.add(1, 'days'));
      this.todoList.unshift(
        new TodoList('column-' + lastDay.format('YYYY-MM-DD'),
          lastDay,
          this.loggedUsername,
          [],
          new Date(),
          new Date())
      );
    }
    this.fillTodos();
  }

  resetDays () {
    this.todoList = [];
    for (var i = -1; i < 4; i++) {
      this.todoList.push(
        new TodoList('column-' + moment().add(i, 'days').format('YYYY-MM-DD'),
          moment().add(i, 'days'),
          this.loggedUsername,
          [],
          new Date(),
          new Date())
      );
    }
    this.fillTodos();
  }

  fillTodos(){
    for (var i = 0; i < this.todoList.length; i++) {
      this.todoList[i].todos = [];
      for(var j=0; j< this.todos.length;j++){
        if(this.todos[j].listId == this.todoList[i].id){
          this.todoList[i].todos.push(this.todos[j])
        }
      }
    }
  }



  getTimePhase(date:Date):string {
    return moment(date).isSame(moment(),'day') ? 'present' :
      moment() < moment(date) ? 'future' : 'past'
  }

  public deleteTodo(todo:Todo,todoList:TodoList,e:any){
    this.todoService.deleteTodo(todo._id).subscribe(res =>{
      for (var i =0; i < this.todos.length; i++)
        if (this.todos[i]._id === todo._id) {
          this.todos.splice(i,1);
          break;
        }
        this.fillTodos();
    })
  }

  addTodo(newTodoInput:string,list:TodoList){
    if(newTodoInput.trim() !== ''){
      var todo = new Todo(null,this.todos.length,false,list.id,list.date,this.loggedUsername,
        newTodoInput,new Date(),null,new Date(),new Date());
      this.todoService.addTodo(todo)
        .subscribe(res => {
          this.todoService.getTodos().subscribe(todos => {
            for(var i=0;i<todos.length;i++)
              if(list.id == todos[i].listId && todos[i].text == newTodoInput)
                list.todos.push(todos[i]);
            newTodoInput = '';
          })
        })
    }
  }

  drop(e){
    console.log("~~~~~~~~~> ");
    console.log(e);
    e.preventDefault();

    var data = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(data));

  }
  allowDrop(e){
    console.log("*********> ");
    console.log(e);

    e.preventDefault();
  }

  drag(e){

    console.log("-------> ");
    console.log(e);
    e.dataTransfer.setData("text", e.target.id);
  }



}
