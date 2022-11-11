import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, Subscription, switchMap } from 'rxjs';

import {
  MutateWorkout,
  Workout,
  WorkoutsService,
} from '../../services/workouts.service';

@Component({
  selector: 'workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnInit, OnDestroy {
  workout$!: Observable<Workout | undefined>;
  subscription!: Subscription;

  constructor(
    private readonly workoutsService: WorkoutsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.workoutsService.workouts$.subscribe();
    this.workout$ = this.route.params.pipe(
      switchMap((param) => this.workoutsService.getWorkout(param['id']))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addWorkout(event: MutateWorkout) {
    this.workoutsService.addWorkout(event);
    this.backToWorkouts();
  }

  updateWorkout(event: MutateWorkout) {
    const key = this.route.snapshot.params['id'];
    this.workoutsService.updateWorkout(key, event);
    this.backToWorkouts();
  }

  removeWorkout(event: MutateWorkout) {
    const key = this.route.snapshot.params['id'];
    this.workoutsService.removeWorkout(key);
    this.backToWorkouts();
  }

  backToWorkouts() {
    this.router.navigate(['workouts']);
  }
}
