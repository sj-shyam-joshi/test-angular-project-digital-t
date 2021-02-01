import { Injectable } from '@angular/core';
import { constants } from 'buffer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constants } from '../constants';
import { TimeSlot } from '../models/timeslot';
import { CommonApiService } from './common-api.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private cas : CommonApiService) { }

  getSlots() : Observable<TimeSlot[]>{
    return this.cas.getAction(Constants.endpointUrls.getSlots);
  }

  getBookedSlots(){
    return this.cas.getAction(environment.APIURL + Constants.endpointUrls.getBookedSlots)
  }

  bookSlot(payload) {
    return this.cas.postAction(environment.APIURL + Constants.endpointUrls.bookSlot, payload)
  }

  getSlotById(slotId : number){
    return this.cas.getAction(environment.APIURL + Constants.endpointUrls.getSlotById + slotId)
  }

  updateSlot(payload) {
    return this.cas.postAction(environment.APIURL + Constants.endpointUrls.updateSlot, payload)
  }
  
}
