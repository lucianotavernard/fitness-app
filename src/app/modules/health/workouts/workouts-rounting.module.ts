import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkoutComponent } from './containers/workout/workout.component';
import { WorkoutsComponent } from './containers/workouts/workouts.component';

const routes: Routes = [
  {
    path: '',
    component: WorkoutsComponent,
  },
  {
    path: 'new',
    component: WorkoutComponent,
  },
  {
    path: ':id',
    component: WorkoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutsRoutingModule {}
