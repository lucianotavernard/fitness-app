import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { WorkoutsRoutingModule } from './workouts-rounting.module';

import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { WorkoutTypeComponent } from './components/workout-type/workout-type.component';

import { WorkoutsComponent } from './containers/workouts/workouts.component';
import { WorkoutComponent } from './containers/workout/workout.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    WorkoutsRoutingModule,
  ],
  declarations: [
    WorkoutFormComponent,
    WorkoutTypeComponent,
    WorkoutComponent,
    WorkoutsComponent,
  ],
})
export class WorkoutsModule {}
