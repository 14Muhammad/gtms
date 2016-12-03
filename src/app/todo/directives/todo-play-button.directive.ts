import { Directive, ElementRef, HostListener, Input, Renderer  } from '@angular/core';
import {VoiceService} from "../services/voice.service";

@Directive({
  selector: '[todoPlayButton]'
})
export class TodoPlayButtonDirective {
  constructor(private el: ElementRef,
              private voiceRecognitionService:VoiceService,
              private renderer: Renderer) {

  }
  @Input('todoPlayButton') todoText: string;
  @HostListener('click') onMouseEnter() {
    this.voiceRecognitionService.play(this.todoText);
  }
  private newTodoInputStyle(index:number, todoRecordButton: boolean, ssRecord:boolean, todoButton:boolean, isHidden:boolean){
    this.renderer.setElementClass(this.el.nativeElement.children[1].children[index],'todo-record-button',todoRecordButton);
    this.renderer.setElementClass(this.el.nativeElement.children[1].children[index],'﻿ss-record',ssRecord);
    this.renderer.setElementClass(this.el.nativeElement.children[1].children[index],'todo-button',todoButton);
    this.renderer.setElementClass(this.el.nativeElement.children[1].children[index],'is-hidden',isHidden);
  }
}
