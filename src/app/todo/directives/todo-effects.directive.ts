import { Directive, ElementRef, HostListener, Input, Renderer  } from '@angular/core';

@Directive({
  selector: '[todoEffects]'
})
export class TodoEffectsDirective {

  private _defaultColor = 'red';
  constructor(private el: ElementRef, private renderer: Renderer) { }
  @Input() set defaultColor(colorName: string){
    this._defaultColor = colorName || this._defaultColor;
  }
  @Input('todoEffects') highlightColor: string;
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || this._defaultColor);
    this.todoEditButtonStyle(1,true,true,true,false);
    this.todoRecordButtonStyle(2,true,true,true,false);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
    this.todoEditButtonStyle(1,true,true,true,true);
    this.todoRecordButtonStyle(2,true,true,true,true);
  }

  @HostListener('click') onClick() {
   // alert('click');
  }

  private highlight(color: string) {
    this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
  }

  private todoEditButtonStyle(index:number, todoEditButton: boolean, ssWrite:boolean, todoButton:boolean, isHidden:boolean){
    this.renderer.setElementClass(this.el.nativeElement.children[1].children[index],'todo-edit-button',todoEditButton);
    this.renderer.setElementClass(this.el.nativeElement.children[1].children[index],'﻿ss-write',ssWrite);
    this.renderer.setElementClass(this.el.nativeElement.children[1].children[index],'todo-button',todoButton);
    this.renderer.setElementClass(this.el.nativeElement.children[1].children[index],'is-hidden',isHidden);
  }

  private todoRecordButtonStyle(index:number, todoRecordButton: boolean, ssRecord:boolean, todoButton:boolean, isHidden:boolean){
    this.renderer.setElementClass(this.el.nativeElement.children[1].children[index],'todo-record-button',todoRecordButton);
    this.renderer.setElementClass(this.el.nativeElement.children[1].children[index],'﻿ss-record',ssRecord);
    this.renderer.setElementClass(this.el.nativeElement.children[1].children[index],'todo-button',todoButton);
    this.renderer.setElementClass(this.el.nativeElement.children[1].children[index],'is-hidden',isHidden);
  }

}
