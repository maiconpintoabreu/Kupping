import { Component, OnInit, ViewChild } from '@angular/core';
import { DanceClassPublicService } from '../services/dance-class.service';
import { DanceClass } from '../model/danceclass';
import { Place } from '../model/place';
import { DanceStyle } from '../model/dancestyle';
import { DanceStylePublicService } from '../services/dance-style.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit { 
  events: DanceClass[] = [];
  styles: DanceStyle[] = [];
  countries: string[] = [];
  cities: string[] = [];
  eventList: DanceClass[] = [];
  styleSelected: DanceStyle;
  countrySelected: string;
  citySelected: string;
  eventSelected: DanceClass;
  constructor(private danceClassService: DanceClassPublicService,private danceStyleService: DanceStylePublicService) {

  }
  
  ngOnInit() {
    this.danceClassService.getDanceClasses().subscribe(res=>{
      this.events = res;
    },err=>{
      console.error("Error:",err);
    })
    this.danceStyleService.getDanceStyles().subscribe(res=>{
      this.styles = res;
    },err=>{
      console.error("Error:",err);
    })
  }
  setStyleSelected(style:DanceStyle){
    this.styleSelected = style;
    this.getCountries();
  }
  setCountrySelected(country:string){
    this.countrySelected = country;
    this.getCities();
  }
  setCitySelected(city:string){
    this.citySelected = city;
    this.getEvents();
  }
  // TODO: Make it better
  getCountries(){
    let eventsFiltered = this.events.filter(x=>x.danceStyle._id == this.styleSelected._id);
    eventsFiltered.forEach(element => {
      this.countries.push(element.place.country);
    });
  }
  // TODO: Make it better
  getCities(){
    let eventsFiltered = this.events.filter(x=>x.place.country == this.countrySelected && x.danceStyle._id == this.styleSelected._id);
    eventsFiltered.forEach(element => {
      this.cities.push(element.place.city);
    });
  }
  // TODO: Make it better
  getEvents(){
    this.eventList = this.events.filter(x=>x.place.city == this.citySelected && x.place.country == this.countrySelected && x.danceStyle._id == this.styleSelected._id);
  }
  reset(){
    this.styleSelected = null;
    this.countrySelected = null;
    this.citySelected = null;
    this.eventSelected = null;
    this.countries= [];
    this.cities = [];
    this.eventList = [];
  }
}
