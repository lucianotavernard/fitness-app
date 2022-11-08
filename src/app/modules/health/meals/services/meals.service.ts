import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { filter, map, of, switchMap, tap } from 'rxjs';

import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Store } from 'src/app/store';

export type Meal = {
  key: string;
  name: string;
  ingredients: string[];
};

export type MutateMeal = Pick<Meal, 'name' | 'ingredients'>;

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  meals$ = this.authService.user.pipe(
    filter((user) => !!user),
    switchMap((user) =>
      this.db
        .list<Meal>(`meals/${user!.uid}`)
        .snapshotChanges()
        .pipe(
          map((meals) =>
            meals.map((meal) => ({
              key: meal.payload.key,
              ...meal.payload.val(),
            }))
          ),
          tap((meals) => this.store.set('meals', meals))
        )
    )
  );

  constructor(
    private readonly db: AngularFireDatabase,
    private readonly authService: AuthService,
    private readonly store: Store
  ) {}

  getMeal(key: string) {
    return this.store.select<Meal[]>('meals').pipe(
      filter(Boolean),
      map((meals) => meals.find((meal) => meal.key === key))
    );
  }

  addMeal(meal: MutateMeal) {
    const user = this.store.value.user;
    return user && this.db.list(`meals/${user.uid}`).push(meal);
  }

  updateMeal(key: string, meal: MutateMeal) {
    const user = this.store.value.user;
    return user && this.db.object(`meals/${user.uid}/${key}`).update(meal);
  }

  removeMeal(key: string) {
    const user = this.store.value.user;
    return user && this.db.list(`meals/${user.uid}`).remove(key);
  }
}
