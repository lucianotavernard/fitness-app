import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

import { User } from './modules/auth/services/auth.service';

export type State = {
  user: User | undefined;
  [key: string]: any;
};

const state: State = {
  user: undefined,
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable();

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(
      distinctUntilChanged(),
      map((state) => state[name])
    );
  }

  set(name: string, state: any) {
    return this.subject.next({ ...this.value, [name]: state });
  }
}
