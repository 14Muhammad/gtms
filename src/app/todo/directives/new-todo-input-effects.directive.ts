import { Directive, ElementRef, HostListener, Input, Renderer  } from '@angular/core';

@Directive({
  selector: '[newTodoInputEffects]'
})
export class NewTodoInputEffectsDirective {

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input('newTodoInputEffects') highlightColor: string;
  @HostListener('mouseenter') onMouseEnter() {
    this.newTodoInputStyle(0,true,true,true,false);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.newTodoInputStyle(0,true,true,true,true);
  }


  private newTodoInputStyle(index:number, todoRecordButton: boolean, ssRecord:boolean, todoButton:boolean, isHidden:boolean){
    this.renderer.setElementClass(this.el.nativeElement.children[1].children[index],'todo-record-button',todoRecordButton);
    this.renderer.setElementClass(this.el.nativeElement.children[1].children[index],'﻿ss-record',ssRecord);
    this.renderer.setElementClass(this.el.nativeElement.children[1].children[index],'todo-button',todoButton);
    this.renderer.setElementClass(this.el.nativeElement.children[1].children[index],'is-hidden',isHidden);
  }

}
