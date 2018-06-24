import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Student } from '../model/student';

@Component({
  selector: 'app-students',
  templateUrl: './form-students.component.html',
  styleUrls: ['./students.component.css']
})
export class FormStudentsComponent implements OnInit {
  isDetail:boolean = false;
  model:Student;
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
        this.model = {name:"Maicon Silva Pinto de Abreu Santana",email:"maiconspas@gmail.com",bornday:"14/05/1987",id:"1"};
      }else{
        this.initStudent();
      }
    }); 
  }
  initStudent(): void{
    this.model = new Student();
  }
  onSubmit(): void{
    if(this.isDetail){
      //edit
    }else{
      //create
    }
  }
}
