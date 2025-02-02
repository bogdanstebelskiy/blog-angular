import { NgIf, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { passwordMatchValidator } from '../../shared/password-match.directive';
import { AuthService } from '../../services/auth/auth.service';
import { UserRequest } from '../../interfaces/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  imports: [
    CardModule,
    ButtonModule,
    NgIf,
    ReactiveFormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: passwordMatchValidator,
      }
    );
  }

  get username() {
    return this.registerForm.controls['username'];
  }
  get email() {
    return this.registerForm.controls['email'];
  }
  get password() {
    return this.registerForm.controls['password'];
  }
  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  submitDetails() {
    const data = this.registerForm.value;
    const postData: UserRequest = {
      username: data.username,
      email: data.email,
      avatarUrl: 'http://staticavatar.org/a.png',
      roleNames: ['User'],
      passwordHash: data.password,
    };
    this.authService.registerUser(postData).then(
      (response) => {
        console.log(response);
        this.snackBar.open('Successful!', 'Ok');
        this.router.navigate(['login']);
      },
      (error) => {
        console.log(error);
        this.snackBar.open('Something went wrong!!!', 'Error');
      }
    );
  }
}
