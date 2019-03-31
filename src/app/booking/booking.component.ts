import { Component, OnInit, HostBinding } from '@angular/core';
import { User } from '../model/user';
import { Routes, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { slideInDownAnimation } from '../animations';
import { first } from 'rxjs/operators';
import { DanceClassPublicService } from '../services/dance-class.service';
import { Booking } from '../model/booking';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  animations: [ slideInDownAnimation ]

})
export class BookingComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  booking : Booking;
  danceClassId : string;
  loading = false;
  error = '';
  constructor(private router: Router, 
    private danceClassService: DanceClassPublicService,
    private route: ActivatedRoute) {
    this.booking = new Booking();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.danceClassId = params.get("danceclassid");
    });

  }
  bookingSubmit() {
    //create booking method

    this.danceClassService.booking(this.danceClassId, this.booking).subscribe(
          data => {
            this.router.navigate(["/home"]);
          },
          error => {
            console.error("Error",error);
              this.error = error;
              this.loading = false;
          });
  }

}
