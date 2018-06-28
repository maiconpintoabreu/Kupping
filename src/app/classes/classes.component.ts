import { Component, OnInit } from '@angular/core';
import { DanceClass } from '../model/danceclass';
import { DanceClassService } from '../services/dance-class.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  classes: DanceClass[];
  constructor(private danceClassService: DanceClassService) { }

  ngOnInit() {
    this.getClasses();
  }
  
  getClasses() : void {
    this.danceClassService.getDanceClasses().subscribe(res=>{
      this.classes = res;
    });
    console.log("List Classes");
  }
  deleteClass(id: string) : void {
    console.log("Delete: "+id);
    this.danceClassService.deleteDanceClass(id).subscribe(res=>{
      this.getClasses();
    },
    err=>{
      console.log(err);
    });
  }

}
