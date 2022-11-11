import { Component, EventEmitter, Input, Output } from '@angular/core';

import { addDays, getDay, startOfWeek } from 'date-fns';

import { ScheduleItem, ScheduleList } from '../../services/schedule.service';

@Component({
  selector: 'schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss'],
})
export class ScheduleCalendarComponent {
  selectedDayIndex!: number;
  selectedWeek!: Date;
  selectedDay!: Date;

  sections = [
    { key: 'morning', name: 'Morning' },
    { key: 'lunch', name: 'Lunch' },
    { key: 'evening', name: 'Evening' },
    { key: 'snacks', name: 'Snacks and Drinks' },
  ];

  @Input()
  items!: ScheduleList | null;

  @Input()
  set date(date: Date | null) {
    const timestamp = date ? date.getTime() : new Date().getTime();
    this.selectedDay = new Date(timestamp);
  }

  @Output()
  change = new EventEmitter<Date>();

  @Output()
  select = new EventEmitter<any>();

  constructor() {}

  ngOnChanges() {
    this.selectedDayIndex = getDay(this.selectedDay);
    this.selectedWeek = startOfWeek(new Date(this.selectedDay));
  }

  getSection(name: string) {
    return (this.items && this.items[name]) || ({} as ScheduleItem);
  }

  selectDay(index: number) {
    const selectedDay = new Date(this.selectedWeek);
    this.change.emit(addDays(selectedDay, index));
  }

  selectSection({ type, assigned, data }: any, section: string) {
    const day = this.selectedDay;
    this.select.emit({ day, data, type, section, assigned });
  }

  onChange(weekOffset: number) {
    const startOfWeekDate = startOfWeek(new Date());
    this.change.emit(addDays(startOfWeekDate, weekOffset * 7));
  }
}
