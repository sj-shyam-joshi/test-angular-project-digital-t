import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageSlotComponent } from './components/dashbaord/subcomponents/manage-slot/manage-slot.component';

const routes: Routes = [
  {path : 'manage-slot', component : ManageSlotComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
