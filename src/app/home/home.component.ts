import { Component, OnInit } from '@angular/core';
import { DanceClassService } from '../services/dance-class.service';
import { DanceClass } from '../model/danceclass';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

interface PlaceData {
  description: string,
  lat: number,
  lng: number,
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  position: Position;
  danceClassPoints: DanceClass;
  placeService: any;
  placeDetailsService: any;
  placeServiceIsReady: true;
  selectedPlaces: PlaceData[] = [];
  constructor(private danceClassService: DanceClassService,private mapsAPILoader: MapsAPILoader) {
    this.mapsAPILoader.load().then(()=>{
      this.placeService = new google.maps.places.AutocompleteService();
      this.placeDetailsService = new google.maps.places.PlacesService(document.createElement('div'));
      this.placeServiceIsReady = true;
    });
  }

  ngOnInit() {
    this.position = {coords:{latitude:0,longitude:0,accuracy:0,altitude:0,altitudeAccuracy:0,heading:0,speed:0},timestamp:1};
    if(window.navigator.geolocation){
      window.navigator.geolocation.getCurrentPosition(position=>{
        this.position = position;
        this.danceClassService.getDanceClasses().subscribe(res=>{
          res.forEach(element => {
            this.getAutocompleteResults(element.place);
          });
        },err=>{

        });
      });
    }
  }
  public getAutocompleteResults(partialCity: string){
    if (this.placeServiceIsReady) {
      var request = {
        query: partialCity,
        fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry']
      };
      this.placeDetailsService.findPlaceFromQuery(request,res=>{
        if(res){
          let parse = JSON.parse(JSON.stringify(res[0]))
          var newPlace: PlaceData = {
            description: parse.formatted_address.description,
            lat: parse.geometry.location.lat,
            lng: parse.geometry.location.lng
          }
          this.selectedPlaces.push(newPlace);
        }
      });
    }
  }
}
