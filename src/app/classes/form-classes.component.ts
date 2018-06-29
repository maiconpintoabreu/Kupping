import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DanceClass } from '../model/danceclass';
import { DanceStyle } from '../model/dancestyle';
import { Student } from '../model/student';
import { DanceClassService } from '../services/dance-class.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-classes',
  templateUrl: './form-classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class FormClassesComponent implements OnInit {
  isDetail:boolean = false;
  model:DanceClass;
  constructor(
    private route: ActivatedRoute, 
    private danceClassService: DanceClassService, 
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.initClass();
    this.model = {name:"",id:"",danceStyle:new DanceStyle(),place:{description:"",lat:0,lng:0},students:null,time:"19:00"};
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.isDetail = params.has("id");
      if(this.isDetail){
        this.model = {name:"Class 1",id:"1",danceStyle:new DanceStyle(),place:{description:"Dublin",lat:0,lng:0},students:null,time:"19:00"};
        this.danceClassService.getDanceClass(params.get('id')).subscribe(res=>{
          console.log(res);
          this.model = res;
        },err=>{
          console.log(err);
        });
      }else{
      }
    }); 
  }
  initClass(): void{
    this.model = new DanceClass();
  }
  goBack(): void {
    this.location.back();
  }
  onSubmit(): void{
    if(this.isDetail){
      this.danceClassService.updateDanceClass(this.model).subscribe(res=>{
        alert("Updated");
      },err=>{
        console.log(err);
      });
    }else{
      this.danceClassService.addDanceClass(this.model).subscribe(res=>{
        alert("Created");
        this.router.navigate(["/admin/classes"]);
      },err=>{
        console.log(err);
      });
    }
  }
}
