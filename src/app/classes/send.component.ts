import { Component, OnInit, HostBinding } from '@angular/core';
import { User } from '../model/user';
import { Routes, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { slideInDownAnimation } from '../animations';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventService } from "../services/private/event.service";
import { Student } from '../model/student';
import { TicketService } from '../services/private/ticket.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css'],
  animations: [ slideInDownAnimation ]

})
export class SendComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  isValid: Boolean;
  classId: string;
  students: Student[] = [];
  studentSelected = {};
  sendForm:FormGroup = new FormGroup({
    user: new FormControl('',[Validators.minLength(2)]),
    email: new FormControl('',[Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]),
    name: new FormControl('',[Validators.minLength(4)]),
    company: new FormControl('',[Validators.minLength(4)]),
    student: new FormControl(true),
    organizer: new FormControl(false),
  });
  loading = false;
  error = '';
  constructor(private router: Router, private userService : UserService,
    private route: ActivatedRoute, private danceClassService: EventService, private ticketService:  TicketService) {
  }
  ngOnInit() {
    this.route.parent.paramMap.subscribe(
      ( params: ParamMap ) : void => {
      this.isValid = params.has("id");
      if(this.isValid){
        this.classId = params.get("id");
        this.danceClassService.getDanceClass(this.classId).subscribe(
          res => {
            res.students.forEach(element=>{
              this.studentSelected[element._id] = false;
            })
            this.students = res.students;
            console.log(this.students)
            this.sendForm.patchValue(this.students);
        });
      }
    });
  }

  sendSubmit() {
    this.loading = true;
    let ids = [];
    this.students.filter(x=>x.selected).forEach(x=>{
      ids.push(x._id);
    });
    this.ticketService.sendTicket(this.classId,ids).subscribe(res=>{
      console.log(res);
      this.loading = false;
    },err=>{
      console.error(err);
      this.loading = false;
    });

  }

  toggleStudentSelected(studentId:string){
    let student = this.students.find(x=>x._id == studentId);
    student.selected = !student.selected;
  }
}
