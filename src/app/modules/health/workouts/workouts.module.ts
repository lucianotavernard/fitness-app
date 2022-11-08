import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutsRoutingModule } from './workouts-rounting.module';

import { WorkoutsComponent } from './containers/workouts/workouts.component';

@NgModule({
  imports: [CommonModule, WorkoutsRoutingModule],
  declarations: [WorkoutsComponent],
})
export class WorkoutsModule {}
