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
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.isDetail = params.has("id");
      if(this.isDetail){
        //this.userService.getUser(params.get('id')).subscribe(res=>{
        //  console.log(res);
          //this.model = res;
        //},err=>{
        //  console.log(err);
        //});

        //TODO: remove MOCK
        this.model = {name:"Class 1",id:"1",danceStyle:new DanceStyle(),date:"01/01/2018",students:null};
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
