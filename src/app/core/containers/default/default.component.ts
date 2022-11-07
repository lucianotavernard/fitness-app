import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Store } from 'src/app/store';

import { AuthService, User } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  user$!: Observable<User>;
  subscription!: Subscription;

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select<User>('user');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogout() {
    this.authService.removeSession().subscribe(() => {
      this.router.navigate(['/auth/sign-in']);
    });
  }
}
