import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from 'src/app/store';

import { User } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  user$!: Observable<User>;

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.user$ = this.store.select<User>('user');
  }
}
