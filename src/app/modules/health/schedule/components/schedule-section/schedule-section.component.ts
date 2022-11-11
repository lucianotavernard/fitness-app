import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { ScheduleItem } from '../../services/schedule.service';

import { Meal } from '../../../meals/services/meals.service';
import { Workout } from '../../../workouts/services/workouts.service';

type ScheduleSection = {
  type: string;
  data: ScheduleItem;
  assigned: Meal[] | Workout[];
};

@Component({
  selector: 'schedule-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.scss'],
})
export class ScheduleSectionComponent {
  @Input()
  name!: string;

  @Input()
  section!: ScheduleItem;

  @Output()
  select = new EventEmitter<ScheduleSection>();

  onSelect(type: string, assigned: Meal[] | Workout[] = []) {
    const data = this.section;
    this.select.emit({ type, data, assigned });
  }
}
