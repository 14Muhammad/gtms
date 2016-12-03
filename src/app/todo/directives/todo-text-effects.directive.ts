import { Directive, ElementRef, HostListener, Input, Renderer  } from '@angular/core';
import {Todo} from "../components/todo/todo";
import {TodoService} from "../services/todo.service";

@Directive({
  selector: '[todoTextEffects]'
})
export class TodoTextEffectsDirective {


  constructor(private el: ElementRef,
              private todoService:TodoService,
              private renderer: Renderer) { }

  @Input('todoTextEffects') todo: Todo;

  @HostListener('click') onClick() {
    this.isDone();
  }

  // @HostListener('dblclick') onDBClick() {
  //   console.log("dbclick")
  // }
/*  @HostListener('drag') onDrag() {
    console.log("onDrag")
  }*/

/*  @HostListener('drop') drop() {
    console.log("drop")
  }*/
/*  @HostListener('dragover') ondragover() {
    console.log("ondragover")
  }*/
/*  @HostListener('dragstart') ondragstart() {
    console.log("ondragstart")
  }*/




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
