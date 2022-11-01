import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

type Message = {
  type: 'success' | 'danger';
  message: string;
};

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}

  message!: Message;

  ngOnInit(): void {}

  registerUser(event: FormGroup) {
    const { email, password } = event.value;

    return this.authService.createUser(email, password).subscribe({
      next: () => {
        this.message = {
          type: 'success',
          message: 'Usuário criado com sucesso!',
        };
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
