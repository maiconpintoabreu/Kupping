import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  publicMenu:boolean = true;
  constructor(private router: Router){
    router.events.subscribe((val) => {
        // see also 
        if(val instanceof NavigationEnd){
          console.log(val.url);
          if(val.url.indexOf("/admin") >= 0){
            this.publicMenu = false;
          }else {
            this.publicMenu = true;
          }
        }
    });
  }

  ngOnInit() {
  }

}
