import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Student } from '../model/student';
import { StudentService } from '../services/student.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-students',
  templateUrl: './form-students.component.html',
  styleUrls: ['./students.component.css']
})
export class FormStudentsComponent implements OnInit {
  isDetail:boolean = false;
  model:Student;
  constructor(
    private route: ActivatedRoute, 
    private studentService: StudentService, 
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.initStudent();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.isDetail = params.has("id");
      if(this.isDetail){
        this.studentService.getStudent(params.get('id')).subscribe(res=>{
          console.log(res);
          this.model = res;
        },err=>{
          console.log(err);
        });
      }else{
        
      }
    }); 
  }
  initStudent(): void{
    this.model = new Student();
  }
  goBack(): void {
    this.location.back();
  }
  onSubmit(): void{
    if(this.isDetail){
      this.studentService.updateStudent(this.model).subscribe(res=>{
        alert("Updated");
      },err=>{
        console.log(err);
      });
    }else{
      this.studentService.addStudent(this.model).subscribe(res=>{
        alert("Created");
        this.router.navigate(["/admin/students"]);
      },err=>{
        console.log(err);
      });
    }
  }
}
