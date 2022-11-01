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
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  message!: Message;

  ngOnInit(): void {}

  loginUser(event: FormGroup) {
    const { email, password } = event.value;

    return this.authService.createSession(email, password).subscribe({
      next: () => {
        this.message = {
          type: 'success',
          message: 'Usuário autenticado com sucesso!',
        };

        this.router.navigate(['/']);
      },
      error: (error) => {
        this.message = {
          type: 'danger',
          message: error.message,
        };
      },
    });
  }
}
