import { Directive, ElementRef, HostListener, Input, Renderer  } from '@angular/core';
import {VoiceService} from "../services/voice.service";
import {TodoList, Todo} from "../components/todo/todo";
import {TodoService} from "../services/todo.service";


@Directive({
  selector: '[newTodoRecordButton]'
})
export class NewTodoRecordButtonDirective {

  private _defaultColor = 'red';
  private isRecording:boolean = false;
  private loggedUsername:string;
  constructor(private el: ElementRef,
              private voiceRecognitionService: VoiceService,
              private todoService:TodoService,
              private renderer: Renderer)
  {
    this.loggedUsername = localStorage.getItem('loggedUsername');
  }
  @Input() set defaultColor(colorName: string){
    this._defaultColor = colorName || this._defaultColor;
  }
  @Input('newTodoRecordButton') list: TodoList;
  @HostListener('mouseenter') onMouseEnter() {

  }

  @HostListener('mousedown') onMouseDown(){
    console.info('mousedown')
    this.blinkingIcon(0,true,true,true,false);
    this.voiceRecognitionService.start('en-US')
      .subscribe((voice)=> {
        this.el.nativeElement.parentNode.previousElementSibling.value = voice;
        this.isRecording = true;
        console.log(voice);
      })
  }

  @HostListener('mouseup') onMouseUp(){
    console.info('mouseup')
    this.blinkingIcon(0,true,true,true,true);
    if(this.isRecording) {
      this.voiceRecognitionService.stop();
      console.log("this.el.nativeElement.parentNode.previousElementSibling.value" +
        this.el.nativeElement.parentNode.previousElementSibling.value);
      console.log(this.list);
      //this.todoService.addTodo();
    }
  }
  @HostListener('mouseout') onMouseOut(){
    console.info('mouseout')

  }

  @HostListener('mouseleave') onMouseLeave(){
    console.info('mouseleave')
    this.blinkingIcon(0,true,true,true,true);
    if(this.isRecording) {
      this.voiceRecognitionService.stop();
      //this.todoService.addTodo(this.list);
      console.log(" mouseleave this.el.nativeElement.parentNode.previousElementSibling.value" +
        this.el.nativeElement.parentNode.previousElementSibling.value);
      console.log(this.list);
      var todo = new Todo(null,1,false,this.list.id,this.list.date,this.loggedUsername,
        this.el.nativeElement.parentNode.previousElementSibling.value,new Date(),null,new Date(),new Date());
      this.todoService.addTodo(todo)
        .subscribe(res => {
          this.isRecording = false;
          var l = this.list;
          this.todoService.getTodos().subscribe(todos => {
            debugger;
            for(var i=0;i<todos.length;i++)
              if(l.id == todos[i].listId && todos[i].text == this.el.nativeElement.parentNode.previousElementSibling.value)
                l.todos.push(todos[i]);
            this.el.nativeElement.parentNode.previousElementSibling.value = '';
          })
        })

    }
  }

  private highlight(color: string) {
    this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
  }

  private blinkingIcon(index:number, faCircle: boolean, textDanger:boolean, blink:boolean, isHidden:boolean){
    this.renderer.setElementClass(this.el.nativeElement.children[index],'fa-circle',faCircle);
    this.renderer.setElementClass(this.el.nativeElement.children[index],'﻿text-danger',textDanger);
    this.renderer.setElementClass(this.el.nativeElement.children[index],'blink',blink);
    this.renderer.setElementClass(this.el.nativeElement.children[index],'is-hidden',isHidden);
  }

}
