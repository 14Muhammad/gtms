import {Injectable, NgZone} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {GTMSWindow} from '../interfaces/gtms-window';

@Injectable()
export class VoiceService{
  recognition:any;
  speechSynthesis:any;
  SpeechSynthesisUtterance:any;

  constructor(private zone:NgZone) {

  }


  /**
   * Record
   * @param {string} language - Language of the voice recognition
   * @returns {Observable<string>} - Observable of voice converted to string
   */
  start(language: string): Observable<string> {
    return Observable.create((observer) => {
      const { webkitSpeechRecognition }: GTMSWindow = <GTMSWindow>window;
      this.recognition = new webkitSpeechRecognition();

      this.recognition.onresult = (e) => this.zone.run(() => observer.next(e.results.item(e.results.length - 1).item(0).transcript));
      this.recognition.onerror = (e) => this.zone.run(() => observer.error('didn\'t recognise your voice '+ e));
      this.recognition.onend = (e) => this.zone.run(() => observer.complete((e) => {
        console.log(e);
      }));

      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = language;
      this.recognition.start();
    });
  }

  stop(){
    if(this.recognition)
      this.recognition.stop();
  }

  play(text:string){


    var wuWindow: GTMSWindow = <GTMSWindow>window;
    this.speechSynthesis = wuWindow.speechSynthesis || {};
    this.SpeechSynthesisUtterance = wuWindow.SpeechSynthesisUtterance || {};


/*    const { speechSynthesis }: GTMSWindow = <GTMSWindow>window;
    this.GTMSWindow.speechSynthesis || {};
    const { SpeechSynthesisUtterance }: GTMSWindow = <GTMSWindow>window;
    this.speechSynthesis = new speechSynthesis;*/

    if(this.speechSynthesis) {
      var utterThis = new this.SpeechSynthesisUtterance(text);
      this.speechSynthesis.speak(utterThis);
    }
  }

}
