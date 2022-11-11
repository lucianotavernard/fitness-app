import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Meal } from '../../../meals/services/meals.service';
import { Workout } from '../../../workouts/services/workouts.service';

@Component({
  selector: 'schedule-assign',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-assign.component.html',
  styleUrls: ['schedule-assign.component.scss'],
})
export class ScheduleAssignComponent implements OnInit {
  private selected: string[] = [];

  @Input()
  section: any;

  @Input()
  list!: any;

  @Output()
  update = new EventEmitter<any>();

  @Output()
  cancel = new EventEmitter<any>();

  ngOnInit() {
    this.selected = [...this.section.assigned];
  }

  toggleItem(name: string) {
    if (this.exists(name)) {
      this.selected = this.selected.filter((item) => item !== name);
    } else {
      this.selected = [...this.selected, name];
    }
  }

  getRoute(name: string) {
    return [`../${name}/new`];
  }

  exists(name: string) {
    return !!~this.selected.indexOf(name);
  }

  updateAssign() {
    this.update.emit({
      [this.section.type]: this.selected,
    });
  }

  cancelAssign() {
    this.cancel.emit();
  }
}
