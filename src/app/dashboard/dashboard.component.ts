import { Component, OnInit } from '@angular/core';
import { DanceClass } from '../model/danceclass';
import { DanceClassService } from '../services/private/dance-class.service';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  studentClasses: DanceClass[] = [];
  constructor(private danceClassService:DanceClassService) { }

  ngOnInit() {
    this.danceClassService.getDanceClassesByStudents().pipe(map(x=>{
      x.forEach(element=>{
        element.toDateFormated = moment(element.toDate).format("Do MMM YYYY")
        element.fromDateFormated = moment(element.fromDate).format("Do MMM YYYY")
        element.toTimeFormated = moment(element.toDate).format("HH:mm")
        element.fromTimeFormated = moment(element.fromDate).format("HH:mm")
      })
      return x;
    })).subscribe(res=>{
      this.studentClasses = res;
    });
  }

}
