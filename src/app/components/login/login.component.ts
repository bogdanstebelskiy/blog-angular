import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LoginRequest } from '../../interfaces/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AxiosService } from '../../axios.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private axiosService: AxiosService,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  get username() {
    return this.loginForm.controls['username'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }

  loginUser() {
    const data = this.loginForm.value;
    const postData: LoginRequest = {
      username: data.username,
      passwordHash: data.password,
    };
    console.log(postData);
    this.authService.loginUser(postData).then(
      (response) => {
        console.log(response);
        this.snackBar.open('Successful!', 'Ok');
        this.axiosService.setAuthToken(response.data.jwtToken);
        this.userService.setUser(response.data.user);
        this.router.navigate(['home']);
      },
      (error) => {
        console.log(error);
        this.snackBar.open('Something went wrong!!!', 'Error');
      }
    );
    /*this.authService.loginUser(postData as LoginRequest).subscribe(
      (response) => {
        console.log(response);
        this.snackBar.open('Successful!', 'Ok');
        const jwtToken = JSON.stringify(response);
        this.router.navigate(['home']);
      },
      (error) => {
        console.log(error);
        this.snackBar.open('Something went wrong!!!', 'Error');
      }
    );*/
  }
}
