import { Directive, ElementRef, HostListener, Input, Renderer  } from '@angular/core';

@Directive({
  selector: '[newTodoInputField]'
})
export class NewTodoInputFieldDirective {

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input('newTodoInputField') newTodoInputText: string;
  @HostListener('focus') onFocus() {
   this.newTodoInputKeyboardRecordIconStyle(1,true,true,true,true)
    //this.newTodoInputStyle(0,true,true,true,false);
  }
  @HostListener('blur') onBlur() {
    this.newTodoInputKeyboardRecordIconStyle(1,true,true,true,false)
    //this.newTodoInputStyle(0,true,true,true,true);
  }


  private newTodoInputKeyboardRecordIconStyle(index:number, todoRecordButton: boolean, ssRecord:boolean, todoButton:boolean, isHidden:boolean){
    this.renderer.setElementClass(this.el.nativeElement.nextElementSibling.childNodes[index],'todo-record-button',todoRecordButton);
    this.renderer.setElementClass(this.el.nativeElement.nextElementSibling.childNodes[index],'﻿ss-record',ssRecord);
    this.renderer.setElementClass(this.el.nativeElement.nextElementSibling.childNodes[index],'todo-button',todoButton);
    this.renderer.setElementClass(this.el.nativeElement.nextElementSibling.childNodes[index],'is-hidden',isHidden);
  }
}
