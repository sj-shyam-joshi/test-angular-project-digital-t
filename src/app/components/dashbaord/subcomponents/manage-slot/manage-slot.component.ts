import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Constants } from 'src/app/constants';
import { ApiService } from 'src/app/services/api.service';
import { DashbaordComponent } from '../../dashbaord.component';
import { ToastrService } from 'ngx-toastr';
import { DpsService } from 'src/app/services/dps.service';
import { Observable } from 'rxjs';

export interface DialogData {
  slotId: number;
  actionType : string;
}

@Component({
  selector: 'app-manage-slot',
  templateUrl: './manage-slot.component.html',
  styleUrls: ['./manage-slot.component.scss']
})
export class ManageSlotComponent implements OnInit {
  slotId : number;
  actionType : string;
  formGroup : FormGroup;
  formPatchValues;

  constructor( public dialogRef: MatDialogRef<DashbaordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb : FormBuilder,
    private apiService : ApiService,
    private toaster : ToastrService,
    private dps : DpsService) {

     this.slotId = data.slotId;
     this.actionType = data.actionType;

     this.formGroup = this.fb.group({
       firstName : ['', [Validators.required, Validators.pattern(Constants.pattern.name)]],
       lastName : ['', [Validators.required, Validators.pattern(Constants.pattern.name)]],
       email : ['',  [Validators.required, Validators.email]]
     })
     }

  ngOnInit(): void {

    if(this.actionType == 'update'){
    this.getSlotValuesById().then(response => {
      this.formGroup.patchValue(response)
    })
    }
  }


  getSlotValuesById()  {
    let promise = new Promise((resolve, reject) => {
      this.apiService.getSlotById(this.slotId)
      .subscribe(response => {
         resolve(response);
      })
    })
    return promise;
  }

  manageSlot(){
    let payload = {
      slotId : this.slotId,
      firstName : this.formValue.firstName,
      lastName : this.formValue.lastName,
      email : this.formValue.email
    }

    if(this.actionType == 'book'){
      this.apiService.bookSlot(payload)
      .subscribe(res => {
        this.dps.getBookedSlots();
       this.toaster.success(Constants.messages.slotBooked);
       this.dialogRef.close();
      }, error => {
        this.toaster.error(error.message);
        this.dialogRef.close();
      })
    }
    else if(this.actionType == 'update'){
        this.apiService.updateSlot(payload)
        .subscribe(res => {
          this.dps.getBookedSlots();
         this.toaster.success(Constants.messages.slotUpdated);
         this.dialogRef.close();
        }, error => {
          this.toaster.error(error.message);
          this.dialogRef.close();
        })
      }
    }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

  get formValue (){
    return this.formGroup.value;
  }

}
