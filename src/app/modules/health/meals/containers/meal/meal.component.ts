import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';

import { MutateMeal, Meal, MealsService } from '../../services/meals.service';

@Component({
  selector: 'meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit, OnDestroy {
  meal$!: Observable<Meal | undefined>;
  subscription!: Subscription;

  constructor(
    private readonly mealsService: MealsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.mealsService.meals$.subscribe();
    this.meal$ = this.route.params.pipe(
      switchMap((param) => this.mealsService.getMeal(param['id']))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addMeal(event: MutateMeal) {
    this.mealsService.addMeal(event);
    this.backToMeals();
  }

  updateMeal(event: MutateMeal) {
    const key = this.route.snapshot.params['id'];
    this.mealsService.updateMeal(key, event);
    this.backToMeals();
  }

  removeMeal(event: MutateMeal) {
    const key = this.route.snapshot.params['id'];
    this.mealsService.removeMeal(key);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }
}
