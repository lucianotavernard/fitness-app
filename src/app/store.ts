import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

import { User } from './modules/auth/services/auth.service';
import { Meal } from './modules/health/meals/services/meals.service';
import { Workout } from './modules/health/workouts/services/workouts.service';
import { ScheduleList } from './modules/health/schedule/services/schedule.service';

type IState = {
  [key: string]: any;
};

export type State = IState & {
  list: any;
  date: Date | undefined;
  user: User | undefined;
  meals: Meal[] | undefined;
  workouts: Workout[] | undefined;
  schedule: ScheduleList | undefined,
  selected: any;
};

const state: State = {
  date: undefined,
  list: undefined,
  user: undefined,
  meals: undefined,
  workouts: undefined,
  selected: undefined,
  schedule: undefined,
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable();

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(
      distinctUntilChanged(),
      map((state) => state[name])
    );
  }

  set(name: string, state: any) {
    return this.subject.next({ ...this.value, [name]: state });
  }
}
