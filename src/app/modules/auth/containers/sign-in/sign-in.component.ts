import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

type Message = {
  type: 'success' | 'danger';
  message: string;
};

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  loading: boolean = false;
  message!: Message;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  loginUser(event: FormGroup) {
    const { email, password } = event.value;

    this.loading = true;

    return this.authService.createSession(email, password).subscribe({
      next: () => {
        this.loading = false;

        this.message = {
          type: 'success',
          message: 'Usuário autenticado com sucesso!',
        };

        this.router.navigate(['/']);
      },
      error: (error) => {
        this.loading = false;

        this.message = {
          type: 'danger',
          message: error.message,
        };
      },
    });
  }
}
