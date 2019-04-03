import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { DanceStyle } from "../model/dancestyle";
import { DanceClassService } from "../services/private/dance-class.service";
import { Location } from "@angular/common";
import { NgModel, FormGroup, FormControl, FormArray } from "@angular/forms";
import { DanceStyleService } from "../services/private/dance-style.service";
import { NgbDate, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: "app-classes",
  templateUrl: "./form-classes.component.html",
  styleUrls: ["./form-classes.component.css"]
})
export class FormClassesComponent implements OnInit {
  @ViewChild('dp') dp:NgbDatepicker;
  @ViewChild('dpmobile') dpmobile:NgbDatepicker;
  countrySuggestions: string[] = [];
  countrySuggestionsStorage: string[] = [];
  emptyCountryStartWithStorage: string[] = [];
  citySuggestions: string[] = [];
  citySuggestionsStorage: string[] = [];
  emptyCityStartWithStorage: string[] = [];
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  meridian = false;
  fromTime:FormControl = new FormControl({
    hour: Number,
    minute: Number,
  });
  toTime:FormControl = new FormControl({
    hour: Number,
    minute: Number,
  });
  classForm:FormGroup = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl(''),
    danceStyleId: new FormControl(''),
    duration: new FormControl(''),
    place: new FormGroup({
      description: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
    }),
    students: new FormArray([
      new FormControl(''),
    ]),
  });
  isDetail: boolean = false;
  // bound:google.maps.LatLngBounds;
  danceStyles: DanceStyle[] = [];
  // private service = new google.maps.places.AutocompleteService();
  constructor(
    private route: ActivatedRoute,
    private danceClassService: DanceClassService,
    private router: Router,
    private location: Location,
    private danceStyleService: DanceStyleService,
    private calendar: NgbCalendar,
  ) {
    this.fromDate = this.calendar.getToday();
    this.toDate = this.calendar.getNext(calendar.getToday(), 'd', 10);
    this.danceStyleService.getDanceStyles().subscribe(
      res => {
        this.danceStyles = res;
      },
      err => {
        alert("Solve this first!!!");
      }
    );
  }
  setCountry(name:string){
    console.log(name);
    (<FormGroup>this.classForm.controls["place"]).controls["country"].patchValue(name);
    this.danceClassService.getCities(name,"").subscribe(res =>{
      this.citySuggestionsStorage = res;
    });
  }
  getCountry(event:any){
    let countryName = this.classForm.value.place.country;
    if(countryName){
      if(this.emptyCountryStartWithStorage.length > 100){
        //clean to avoid memory issue
        this.emptyCountryStartWithStorage = [];
      }
      let cacheSuggestions = this.countrySuggestionsStorage.filter(x=>x.toLowerCase().startsWith(countryName.toLowerCase()));
      if(cacheSuggestions.length > 0 || this.emptyCountryStartWithStorage.find(x=>countryName.toLowerCase().startsWith(x.toLowerCase()))){
        this.countrySuggestions = cacheSuggestions;
      }else{
        this.danceClassService.getCountries(countryName).subscribe(res =>{
          this.countrySuggestions = res;
          if(countryName.length == 1)
          this.countrySuggestionsStorage = this.countrySuggestionsStorage.concat(res);
          if(res.length == 0){
            this.emptyCountryStartWithStorage.push(countryName);
          }
        },err=>{
          console.log(err);
        })
      }
    }
  }
  setCity(name:string){
    console.log(name);
    (<FormGroup>this.classForm.controls["place"]).controls["city"].patchValue(name);
  }
  getCity(event:any){
    let countryName = this.classForm.value.place.country;
    let cityName = this.classForm.value.place.city;
    if(countryName && cityName){
      if(this.emptyCityStartWithStorage.length > 100){
        //clean to avoid memory issue
        this.emptyCityStartWithStorage = [];
      }
      let cacheSuggestions = this.citySuggestionsStorage.filter(x=>x.toLowerCase().startsWith(cityName.toLowerCase()));
      if(cacheSuggestions.length > 0 || this.emptyCityStartWithStorage.find(x=>(countryName.toLowerCase()+cityName.toLowerCase()).startsWith(x.toLowerCase()))){
        this.citySuggestions = cacheSuggestions;
      }else{
        this.danceClassService.getCities(countryName,cityName).subscribe(res =>{
          this.citySuggestions = res;
          if(cityName.length == 1)
          this.citySuggestionsStorage = this.citySuggestionsStorage.concat(res);
          if(res.length == 0){
            this.emptyCityStartWithStorage.push(countryName.toLowerCase()+cityName.toLowerCase());
          }
        },err=>{
          console.log(err);
        })
      }
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.isDetail = params.has("id");
      this.fromTime.patchValue({hour:16,minute:0});
      this.toTime.patchValue({hour:0,minute:0});
      if (this.isDetail) {
        this.danceClassService.getDanceClass(params.get("id")).subscribe(
          res => {
            this.classForm.patchValue(res);
            if(res.danceStyle){
              this.classForm.controls["danceStyleId"].setValue(res.danceStyle._id);
            }else{
              this.classForm.controls["danceStyleId"].setValue(this.danceStyles[0]._id);
            }
            if(res.fromDate){
              const momentFromDate = moment(res.fromDate);
              let fromDateRes = new NgbDate(momentFromDate.get('year'),momentFromDate.get('month'),momentFromDate.get('date'));
              this.dp.navigateTo({year: momentFromDate.get('year'), month: momentFromDate.get('month')});
              this.dpmobile.navigateTo({year: momentFromDate.get('year'), month: momentFromDate.get('month')});
              this.onDateSelection(fromDateRes);
              this.fromTime.patchValue({hour: momentFromDate.get('hour'),minute:momentFromDate.get('minute')});
            }else{
              console.warn("no from date");
            }
            if(res.toDate){
              const momentToDate = moment(res.toDate);

              let toDateRes = new NgbDate(momentToDate.get('year'),momentToDate.get('month'),momentToDate.get('date'));
              this.onDateSelection(toDateRes);
              this.toTime.patchValue({hour: momentToDate.get('hour'),minute:momentToDate.get('minute')});
            }else{
              console.warn("no to date");
            }
          },
          err => {
            console.error("Error:",err);
          }
        );
      } else {
      }
    });
  }
  goBack(): void {
    this.location.back();
  }
  toggleMeridian() {
      this.meridian = !this.meridian;
  }
  onSubmit(): void {
    const hourTo =  this.toTime.valid  ? this.toTime.value.hour : 0;
    const minuteTo = this.toTime.valid  ? this.toTime.value.minute : 0;
    const hourFrom =  this.fromTime.valid  ? this.fromTime.value.hour : 0;
    const minuteFrom = this.fromTime.valid  ? this.fromTime.value.minute : 0;
    let dateToFormated = new Date(this.toDate.year,this.toDate.month,this.toDate.day,hourTo,minuteTo);
    let dateFromFormated = new Date(this.fromDate.year,this.fromDate.month,this.fromDate.day,hourFrom,minuteFrom);
    if(moment(dateFromFormated).isValid() && moment(dateToFormated).isValid()){
      let toSave = this.classForm.value;
      toSave.danceStyle = this.danceStyles.find(x=>x._id == toSave.danceStyleId);
      delete(toSave.danceStyleId);
      delete(toSave.students);
      toSave.fromDate = moment(dateFromFormated).valueOf();
      toSave.toDate = moment(dateToFormated).valueOf();
      if (this.isDetail) {
        this.danceClassService.updateDanceClass(toSave).subscribe(
          res => {
            alert("Updated");
          },
          err => {
            console.error("Error:",err);
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
            console.error("Error:",err);
          }
        );
      }
    }
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && NgbDate.from(this.fromDate)) {
      if(date.before(this.fromDate)){
        this.toDate = this.fromDate;
        this.fromDate = date;
      }else{
        this.toDate = date;
      }
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && (date.after(this.fromDate) && date.before(this.hoveredDate)) || (date.before(this.fromDate) && date.after(this.hoveredDate));
  }

  isInside(date: NgbDate) {
    return (date.after(this.fromDate) && date.before(this.toDate)) || (date.before(this.fromDate) && date.after(this.hoveredDate));
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }
}
