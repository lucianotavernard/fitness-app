import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from 'src/app/store';
import { Meal, MealsService } from '../../../meals/services/meals.service';
import {
  Workout,
  WorkoutsService,
} from '../../../workouts/services/workouts.service';
import { ScheduleList, ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  open = false;

  date$!: Observable<Date>;
  list$!: Observable<Meal[] | Workout[]>;
  schedule$!: Observable<ScheduleList>;
  selected$!: Observable<any>;
  subscriptions: Subscription[] = [];

  constructor(
    private readonly store: Store,
    private readonly mealsService: MealsService,
    private readonly workoutsService: WorkoutsService,
    private readonly scheduleService: ScheduleService
  ) {}

  ngOnInit() {
    this.date$ = this.store.select('date');
    this.list$ = this.store.select('list');
    this.selected$ = this.store.select('selected');
    this.schedule$ = this.store.select('schedule');

    this.subscriptions = [
      this.mealsService.meals$.subscribe(),
      this.workoutsService.workouts$.subscribe(),

      this.scheduleService.list$.subscribe(),
      this.scheduleService.items$.subscribe(),
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(section: any) {
    this.open = true;
    this.scheduleService.selectSection(section);
  }

  assignItem(items: string[]) {
    this.scheduleService.updateItems(items);
    this.closeAssign();
  }

  closeAssign() {
    this.open = false;
  }
}
