import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Workout, MutateWorkout } from '../../services/workouts.service';

@Component({
  selector: 'workout-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss'],
})
export class WorkoutFormComponent implements OnChanges {
  toggled = false;
  exists = false;

  @Input()
  workout!: Workout;

  @Output()
  create = new EventEmitter<MutateWorkout>();

  @Output()
  update = new EventEmitter<MutateWorkout>();

  @Output()
  remove = new EventEmitter<MutateWorkout>();

  form = this.fb.group({
    name: ['', Validators.required],
    type: ['strength', Validators.required],
    strength: this.fb.group({
      reps: 0,
      sets: 0,
      weight: 0,
    }),
    endurance: this.fb.group({
      distance: 0,
      duration: 0,
    }),
  });

  constructor(private readonly fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.workout && this.workout.name) {
      this.exists = true;

      const value = this.workout;
      this.form.patchValue(value);
    }
  }

  get placeholder() {
    return `e.g. ${this.type === 'strength' ? 'Benchpress' : 'Treadmill'}`;
  }

  get required() {
    const control = this.form.get('name');
    return control && control.touched && control.hasError('required');
  }

  get type() {
    const control = this.form.get('type');
    return control && control.value;
  }

  createWorkout() {
    if (this.form.valid) {
      this.create.emit(this.form.value as Workout);
    }
  }

  updateWorkout() {
    if (this.form.valid) {
      this.update.emit(this.form.value as Workout);
    }
  }

  removeWorkout() {
    this.remove.emit(this.form.value as Workout);
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
