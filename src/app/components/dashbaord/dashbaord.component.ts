import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, tap } from 'rxjs/operators';
import { TimeSlot } from 'src/app/models/timeslot';
import { DpsService } from 'src/app/services/dps.service';
import { ManageSlotComponent } from './subcomponents/manage-slot/manage-slot.component';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashbaordComponent implements OnInit {
  
  public timeslots : TimeSlot[] = [];
  public bookedSlotsIds : number[] = [];
  constructor(
    private dps : DpsService,
    private dialog : MatDialog) {
   
   }

  ngOnInit(): void {
    this.getSlots();
    this.getBookedSlots();
  }

  getSlots() {
    this.dps.slots.subscribe(response => {
      this.timeslots = response;
    })
  }

  getBookedSlots(){
    this.dps.bookedSlots
    .pipe(
      map(response => response.map(item => item.slotId))
    ).subscribe(response => {
      this.bookedSlotsIds = response;
    })
  }

  openDialog(slotId : number, actionType : string): void {
   
    const dialogRef = this.dialog.open(ManageSlotComponent, {
      width: '400px',
      data: {slotId: slotId, actionType : actionType}
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }


}
