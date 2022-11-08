import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MealsRoutingModule } from './meals-rounting.module';


import { MealFormComponent } from './components/meal-form/meal-form.component';

import { MealsComponent } from './containers/meals/meals.component';
import { MealComponent } from './containers/meal/meal.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, SharedModule, MealsRoutingModule],
  declarations: [MealFormComponent, MealComponent, MealsComponent],
})
export class MealsModule {}
