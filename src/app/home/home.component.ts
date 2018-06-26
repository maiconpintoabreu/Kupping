import { Component, OnInit } from '@angular/core';
import { DanceClassService } from '../services/dance-class.service';
import { DanceClass } from '../model/danceclass';
import { MapsAPILoader } from '@agm/core';
import { Place } from '../model/place';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  position: Position;
  danceClassPoints: DanceClass;
  selectedPlaces: Place[] = [];
  constructor(private danceClassService: DanceClassService) {
  }

  ngOnInit() {
    this.position = {coords:{latitude:0,longitude:0,accuracy:0,altitude:0,altitudeAccuracy:0,heading:0,speed:0},timestamp:1};
    if(window.navigator.geolocation){
      window.navigator.geolocation.getCurrentPosition(position=>{
        this.position = position;
        this.danceClassService.getDanceClasses().subscribe(res=>{
          res.forEach(element => {
            this.selectedPlaces.push(element.place);
          });
        },err=>{

        });
      },err=>{
        this.position= {coords:{latitude:53.3487119,longitude:-6.2581781,accuracy:0,altitude:0,altitudeAccuracy:0,heading:0,speed:0},timestamp:1};
        
        this.danceClassService.getDanceClasses().subscribe(res=>{
          res.forEach(element => {
            this.selectedPlaces.push(element.place);
          });
        },err=>{

        });
      });
    }
  }
}
