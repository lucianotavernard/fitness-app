import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

import { Meal, MutateMeal } from '../../services/meals.service';

@Component({
  selector: 'meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
})
export class MealFormComponent implements OnChanges {
  toggled = false;
  exists = false;

  @Input()
  meal!: Meal;

  @Output()
  create = new EventEmitter<MutateMeal>();

  @Output()
  update = new EventEmitter<MutateMeal>();

  @Output()
  remove = new EventEmitter<MutateMeal>();

  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array(['']),
  });

  constructor(private readonly fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.meal && this.meal.name) {
      this.exists = true;
      this.emptyIngredients();

      const value = this.meal;
      this.form.patchValue(value);

      if (value.ingredients) {
        for (const item of value.ingredients) {
          this.ingredients.push(new FormControl(item));
        }
      }
    }
  }

  get required() {
    const control = this.form.get('name');
    return control && control.touched && control.hasError('required');
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  emptyIngredients() {
    while (this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  createMeal() {
    if (this.form.valid) {
      const { name, ingredients = [] } = this.form.value;

      this.create.emit({
        name: name || '',
        ingredients: ingredients.map(String),
      });
    }
  }

  updateMeal() {
    if (this.form.valid) {
      const { name, ingredients = [] } = this.form.value;

      this.update.emit({
        name: name || '',
        ingredients: ingredients.map(String),
      });
    }
  }

  removeMeal() {
    const { name, ingredients = [] } = this.form.value;

    this.remove.emit({
      name: name || '',
      ingredients: ingredients.map(String),
    });
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
