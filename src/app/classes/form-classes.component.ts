import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DanceClass } from '../model/danceclass';
import { DanceStyle } from '../model/dancestyle';
import { Student } from '../model/student';

@Component({
  selector: 'app-classes',
  templateUrl: './form-classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class FormClassesComponent implements OnInit {
  isDetail:boolean = false;
  model:DanceClass;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.model = {name:"",id:"",danceStyle:new DanceStyle(),place:{description:"",lat:0,lng:0},students:null,time:"19:00"};
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.isDetail = params.has("id");
      if(this.isDetail){
        this.model = {name:"Class 1",id:"1",danceStyle:new DanceStyle(),place:{description:"Dublin",lat:0,lng:0},students:null,time:"19:00"};
        //this.userService.getUser(params.get('id')).subscribe(res=>{
        //  console.log(res);
          //this.model = res;
        //},err=>{
        //  console.log(err);
        //});

        //TODO: remove MOCK
      }else{
        this.initClass();
      }
    }); 
  }
  initClass(): void{
    this.model = new DanceClass();
  }
  onSubmit(): void{
    if(this.isDetail){
      //edit
    }else{
      //create
    }
  }
}
