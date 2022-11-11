import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'schedule-controls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-controls.component.html',
  styleUrls: ['./schedule-controls.component.scss'],
})
export class ScheduleControlsComponent {
  offset = 0;

  @Input()
  selected!: Date;

  @Output()
  move = new EventEmitter<number>();

  constructor() {}

  moveDate(offset: number) {
    this.offset = offset;

    this.move.emit(offset);
  }
}
