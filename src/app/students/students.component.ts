import { Component, OnInit } from '@angular/core';
import { Student } from '../model/student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[];
  constructor() { }

  ngOnInit() {
    this.getStudents();
  }
  
  getStudents() : void {
    //this.userService.getUsers().subscribe(res=>{
    //  this.users = res;
    //});
    console.log("List Students");
  }
  deleteStudent(id: string) : void {
    console.log("Delete: "+id);
    //this.userService.deleteUser(id).subscribe(res=>{
    //  this.getUsers();
    //},
    //err=>{
    //  console.log(err);
    //});
  }
}
