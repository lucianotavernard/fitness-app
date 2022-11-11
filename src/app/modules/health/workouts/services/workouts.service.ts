import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { filter, map, switchMap, tap } from 'rxjs';

import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Store } from 'src/app/store';

export type Workout = {
  key: string;
  type: string;
  name: string;
  strength?: any;
  endurance?: any;
};

export type MutateWorkout = Omit<Workout, 'key'>;

@Injectable({
  providedIn: 'root',
})
export class WorkoutsService {
  workouts$ = this.authService.user.pipe(
    filter((user) => !!user),
    switchMap((user) =>
      this.db
        .list<Workout>(`workouts/${user!.uid}`)
        .snapshotChanges()
        .pipe(
          map((workouts) =>
            workouts.map((workout) => ({
              key: workout.payload.key,
              ...workout.payload.val(),
            }))
          ),
          tap((workouts) => this.store.set('workouts', workouts))
        )
    )
  );

  constructor(
    private readonly db: AngularFireDatabase,
    private readonly authService: AuthService,
    private readonly store: Store
  ) {}

  getWorkout(key: string) {
    return this.store.select<Workout[]>('workouts').pipe(
      filter(Boolean),
      map((workouts) => workouts.find((workout) => workout.key === key)),
      map((workout) => workout || ({} as Workout))
    );
  }

  addWorkout(workout: MutateWorkout) {
    const user = this.store.value.user;
    return user && this.db.list(`workouts/${user.uid}`).push(workout);
  }

  updateWorkout(key: string, workout: MutateWorkout) {
    const user = this.store.value.user;
    return (
      user && this.db.object(`workouts/${user.uid}/${key}`).update(workout)
    );
  }

  removeWorkout(key: string) {
    const user = this.store.value.user;
    return user && this.db.list(`workouts/${user.uid}`).remove(key);
  }
}
