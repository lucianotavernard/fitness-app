import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';

import {
  BehaviorSubject,
  filter,
  map,
  Subject,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';

import { startOfDay, endOfDay } from 'date-fns';

import { Store } from 'src/app/store';

import { Meal } from '../../meals/services/meals.service';
import { Workout } from '../../workouts/services/workouts.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

export type ScheduleItem = {
  key: string;
  meals: Meal[];
  workouts: Workout[];
  section: string;
  timestamp: number;
};

export type ScheduleList = Partial<{
  [key: string]: ScheduleItem;
}>;

export type MutateScheduleItem = Omit<ScheduleItem, 'key'>;

type Schedule = {
  section: string;
};

type Section = {
  section: any;
  type: any;
  data: any;
  day: any;
};

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject<Section>();
  private itemList$ = new Subject<any>();

  items$ = this.itemList$.pipe(
    withLatestFrom(this.section$),
    map(([items, section]) => {
      const id = section.data.key;

      const defaults: MutateScheduleItem = {
        meals: [],
        workouts: [],
        section: section.section,
        timestamp: new Date(section.day).getTime(),
      };

      const payload = {
        ...(id ? section.data : defaults),
        ...items,
      };

      return id ? this.updateSection(id, payload) : this.addSection(payload);
    })
  );

  list$ = this.section$.pipe(
    map((list) => this.store.value[list.type]),
    tap((section) => this.store.set('list', section))
  );

  selected$ = this.section$.pipe(
    tap((section) => this.store.set('selected', section))
  );

  schedule$ = this.authService.user.pipe(
    filter((user) => !!user),
    switchMap((user) =>
      this.date$.pipe(
        tap((date) => this.store.set('date', date)),
        map((date) => [startOfDay(date).getTime(), endOfDay(date).getTime()]),
        switchMap(([startAt, endAt]) =>
          this.db
            .list<Schedule>(`schedule/${user!.uid}`, (ref) =>
              ref.orderByChild('timestamp').startAt(startAt).endAt(endAt)
            )
            .snapshotChanges()
            .pipe(
              map((schedules) =>
                schedules.reduce((mapped, schedule) => {
                  const section = schedule.payload.val()?.section;

                  if (section && !mapped[section]) {
                    mapped[section] = {
                      key: schedule.payload.key,
                      ...schedule.payload.val(),
                    };
                  }

                  return mapped;
                }, {} as any)
              ),
              tap((schedule) => this.store.set('schedule', schedule))
            )
        )
      )
    )
  );

  constructor(
    private readonly db: AngularFireDatabase,
    private readonly authService: AuthService,
    private readonly store: Store
  ) {}

  updateDate(date: Date) {
    this.date$.next(date);
  }

  updateItems(items: string[]) {
    this.itemList$.next(items);
  }

  selectSection(event: any) {
    this.section$.next(event);
  }

  private addSection(payload: ScheduleItem) {
    const user = this.store.value.user;

    return user && this.db.list(`schedule/${user.uid}`).push(payload);
  }

  private updateSection(key: string, payload: ScheduleItem) {
    const user = this.store.value.user;
    return (
      user && this.db.object(`schedule/${user.uid}/${key}`).update(payload)
    );
  }
}
