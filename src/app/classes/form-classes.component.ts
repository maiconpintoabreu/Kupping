import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { DanceClass } from "../model/danceclass";
import { DanceStyle } from "../model/dancestyle";
import { Student } from "../model/student";
import { DanceClassService } from "../services/private/dance-class.service";
import { Location } from "@angular/common";
import { NgModel, FormGroup, FormControl, FormArray } from "@angular/forms";
import { DanceStyleService } from "../services/private/dance-style.service";

@Component({
  selector: "app-classes",
  templateUrl: "./form-classes.component.html",
  styleUrls: ["./classes.component.css"]
})
export class FormClassesComponent implements OnInit {
  classForm:FormGroup = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl(''),
    danceStyleId: new FormControl(''),
    date: new FormControl(''),
    hour: new FormControl(''),
    duration: new FormControl(''),
    place: new FormGroup({
      description: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
    }),
    students: new FormArray([]),
  });
  isDetail: boolean = false;
  model: DanceClass;
  // bound:google.maps.LatLngBounds;
  danceStyles: DanceStyle[] = [];
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
    this.initClass();
    this.model = {
      name: "",
      _id: "",
      danceStyle: this.danceStyles[0],
      place: { description: "",city:"",country:"", lat: 0, lng: 0 },
      students: null,
      time: "19:00"
    };
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.isDetail = params.has("id");
      if (this.isDetail) {
        this.danceClassService.getDanceClass(params.get("id")).subscribe(
          res => {
            this.classForm.patchValue(res);
            if(res.danceStyle){
              this.classForm.controls["danceStyleId"].setValue(res.danceStyle._id);
            }else{
              this.classForm.controls["danceStyleId"].setValue(this.danceStyles[0]._id);
            }
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
    let toSave = this.classForm.value;
    toSave.danceStyle = this.danceStyles.find(x=>x._id == toSave.danceStyleId);
    delete(toSave.danceStyleId);
    if (this.isDetail) {
      this.danceClassService.updateDanceClass(toSave).subscribe(
        res => {
          alert("Updated");
        },
        err => {
          console.log(err);
        }
      );
    } else {
      delete(toSave._id);
      this.danceClassService.addDanceClass(toSave).subscribe(
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
