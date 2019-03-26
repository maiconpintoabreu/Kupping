import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { DanceClass } from "../model/danceclass";
import { DanceStyle } from "../model/dancestyle";
import { Student } from "../model/student";
import { DanceClassService } from "../services/private/dance-class.service";
import { Location } from "@angular/common";
import { NgModel } from "@angular/forms";
import { DanceStyleService } from "../services/private/dance-style.service";

@Component({
  selector: "app-classes",
  templateUrl: "./form-classes.component.html",
  styleUrls: ["./classes.component.css"]
})
export class FormClassesComponent implements OnInit {
  isDetail: boolean = false;
  model: DanceClass;
  // bound:google.maps.LatLngBounds;
  danceStyles: Array<DanceStyle>=[];
  // private service = new google.maps.places.AutocompleteService();
  constructor(
    private route: ActivatedRoute,
    private danceClassService: DanceClassService,
    private router: Router,
    private location: Location,
    private danceStyleService: DanceStyleService
  ) {
    this.danceStyleService.getDanceStyles().subscribe(
      res => {
        this.danceStyles = res;
        if (this.model) {
          this.model.danceStyle = this.danceStyles[0];
        }
      },
      err => {
        alert("Solve this first!!!");
      }
    );
  }

  ngOnInit() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        // this.bound = new google.maps.LatLngBounds(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
      });
    }
    this.initClass();
    this.model = {
      name: "",
      id: "",
      danceStyle: new DanceStyle(),
      place: { description: "",city:"",country:"", lat: 0, lng: 0 },
      students: null,
      time: "19:00"
    };
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.isDetail = params.has("id");
      if (this.isDetail) {
        this.model = {
          name: "Class 1",
          id: "1",
          danceStyle: new DanceStyle(),
          place: { description: "Dublin", city: "Dublin" ,country: "Ireland", lat: 0, lng: 0 },
          students: null,
          time: "19:00"
        };
        this.danceClassService.getDanceClass(params.get("id")).subscribe(
          res => {
            console.log(res);
            this.model = res;
            this.model.id = res["_id"];
            this.model.danceStyle = this.danceStyles.find(
              x => x._id == "" + res.danceStyle
            );
          },
          err => {
            console.log(err);
          }
        );
      } else {
      }
    });
  }
  initClass(): void {
    this.model = new DanceClass();
  }
  goBack(): void {
    this.location.back();
  }
  onSubmit(): void {
    if (this.isDetail) {
      this.danceClassService.updateDanceClass(this.model).subscribe(
        res => {
          alert("Updated");
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.danceClassService.addDanceClass(this.model).subscribe(
        res => {
          alert("Created");
          this.router.navigate(["/admin/classes"]);
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  // autoCompletePlace(ngModel: NgModel): void {
  //   if (ngModel != null && ngModel.toString().length > 4) {
  //     var request = {
  //       input: ngModel.toString()
  //       // bounds:this.bound
  //     };
  //     // this.service.getPlacePredictions(request,this.callback);
  //   }
  // }
  // callback(results, status): void {
  //   // if (status == google.maps.places.PlacesServiceStatus.OK) {
  //   for (var i = 0; i < results.length; i++) {
  //     var place = results[i];
  //     console.log(place);
  //   }
  // }
}
