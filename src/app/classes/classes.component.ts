import { Component, OnInit } from '@angular/core';
import { Event } from '../model/event';
import { EventService } from '../services/private/event.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  classes: Event[];
  constructor(private danceClassService: EventService) { }

  ngOnInit() {
    this.getClasses();
  }
  
  getClasses() : void {
    this.danceClassService.getDanceClasses().subscribe(res=>{
      this.classes = res;
    });
  }
  deleteClass(id: string) : void {
    this.danceClassService.deleteDanceClass(id).subscribe(res=>{
      this.getClasses();
    },
    err=>{
      console.error("Error",err);
    });
  }
}
