import {Component, OnInit} from '@angular/core';
import {CookieService} from "angular2-cookie/services/cookies.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
   // alert("init")
  }
  constructor(private cookieService:CookieService){
      //this.cookieService.get();
    /*Cookie.set('cookieName', 'cookieValue');
    Cookie.set('cookieName', 'cookieValue', 10 /!*days from now*!/);
    Cookie.set('cookieName', 'cookieValue', 10, '/myapp/', 'mydomain.com');*/
   // alert("cons");
  }
imageURL:string = 'http://cdn.wallpapersafari.com/19/74/4SjBN7.jpg';
  title = 'GTMS';

}
