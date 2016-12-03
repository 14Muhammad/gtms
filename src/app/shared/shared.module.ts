import {NgModule} from '@angular/core';
import {Ellipses} from "./pipes/ellipses";
import {Exponential} from "./pipes/exponential";
import {InitCapsPipe} from "./pipes/init-caps.pipe";



@NgModule({
  imports: [
  ],
  declarations: [
    Ellipses,
    Exponential,
    InitCapsPipe
  ],
  providers:[
  ],
  schemas:[
  ],
  exports:[
  ]
})
export class SharedModule { }
