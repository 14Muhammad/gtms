import {Directive, ElementRef, Renderer, Input, HostListener} from '@angular/core';
import {TodoService} from "../services/todo.service";
import {Todo} from "../components/todo/todo";

@Directive({
  selector: '[todoDeleteButton]'
})
export class TodoDeleteButtonDirective {


  constructor(private el: ElementRef,
              private todoService:TodoService,
              private renderer: Renderer) { }

  @Input('todoDeleteButton') todo: Todo;

  @HostListener('click') onClick() {
    console.log(this.todo);
    //this.deleteTodo();
  }

  private deleteTodo(){
    this.todoService.deleteTodo(this.todo._id).subscribe(res =>{
      console.log(JSON.stringify(res));
      var li = this.el.nativeElement.parentElement.parentElement.parentElement;
      li.parentNode.removeChild(li);
    })
  }
  private isDone(){
    var li = this.el.nativeElement.parentElement.parentElement.parentElement;
    if(li.classList.contains('is-done')) {
      this.renderer.setElementClass(li, 'is-done', false);
      this.todoService.updateTodo(this.todo._id, {isDone:false}).subscribe(res=>{
        console.log("is done false ==> " + JSON.stringify(res));
      })
    }
    else {
      this.renderer.setElementClass(li, 'is-done', true);
      this.todoService.updateTodo(this.todo._id, {isDone:true}).subscribe(res=>{
        console.log("is done true ==> " + JSON.stringify(res));
      })
    }
  }


}
