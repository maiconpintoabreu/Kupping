import { Component, OnInit } from '@angular/core';
import { DanceClass } from '../model/danceclass';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  classes: DanceClass[];
  constructor() { }

  ngOnInit() {
    this.getClasses();
  }
  
  getClasses() : void {
    //this.userService.getUsers().subscribe(res=>{
    //  this.users = res;
    //});
    console.log("List Classes");
  }
  deleteClass(id: string) : void {
    console.log("Delete: "+id);
    //this.userService.deleteUser(id).subscribe(res=>{
    //  this.getUsers();
    //},
    //err=>{
    //  console.log(err);
    //});
  }

}
