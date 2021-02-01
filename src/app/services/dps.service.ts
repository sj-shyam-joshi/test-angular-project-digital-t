import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TimeSlot } from '../models/timeslot';
import { ApiService } from './api.service';
import { CommonApiService } from './common-api.service';

@Injectable({
  providedIn: 'root'
})
export class DpsService {
 public slots  = new BehaviorSubject([]);
 public bookedSlots  = new BehaviorSubject([]);
 
 
  constructor(private apiService : ApiService) { 
    this.getSlots();
    this.getBookedSlots();
  }

  getSlots() {
    this.apiService.getSlots()
    .subscribe(response => {
     this.slots.next(response)
    })
  }

  getBookedSlots() {
    this.apiService.getBookedSlots()
    .subscribe(response => {
     this.bookedSlots.next(response);
    })
  }

  
}
