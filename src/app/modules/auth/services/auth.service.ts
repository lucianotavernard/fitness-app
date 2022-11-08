import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, tap } from 'rxjs';

import { Store } from 'src/app/store';

export type User = {
  uid: string;
  email: string;
  authenticated: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth$ = this.af.authState.pipe(
    tap((response) => {
      let user = undefined;

      if (response) {
        user = {
          uid: response.uid,
          email: response.email,
          authenticated: true,
        };
      }

      this.store.set('user', user);
    })
  );

  constructor(
    private readonly af: AngularFireAuth,
    private readonly store: Store
  ) {}

  get user() {
    return this.af.user;
  }

  get authState() {
    return this.af.authState;
  }

  createUser(email: string, password: string) {
    return from(this.af.createUserWithEmailAndPassword(email, password));
  }

  createSession(email: string, password: string) {
    return from(this.af.signInWithEmailAndPassword(email, password));
  }

  removeSession() {
    return from(this.af.signOut());
  }
}
