import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, map } from 'rxjs';

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
  constructor(
    private readonly af: AngularFireAuth,
    private readonly store: Store
  ) {}

  createUser(email: string, password: string) {
    return from(this.af.createUserWithEmailAndPassword(email, password));
  }

  createSession(email: string, password: string) {
    return from(this.af.signInWithEmailAndPassword(email, password)).pipe(
      map((response) => {
        let user = undefined;

        if (response.user) {
          user = {
            uid: response.user.uid,
            email: response.user.email,
            authenticated: true,
          };
        }

        this.store.set('user', user);
      })
    );
  }
}
