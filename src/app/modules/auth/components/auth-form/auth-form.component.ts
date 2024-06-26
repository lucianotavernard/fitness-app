import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'auth-form',
  templateUrl: 'auth-form.component.html',
  styleUrls: ['auth-form.component.scss'],
})
export class AuthFormComponent {
  @Output()
  submitted = new EventEmitter<FormGroup>();

  form = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form);
    }
  }

  get emailInvalid() {
    const control = this.form.get('email');
    return control && control.touched && control.hasError('email')
  }

  get passwordRequired() {
    const control = this.form.get('password');
    return control && control.touched && control.hasError('required');
  }
}
