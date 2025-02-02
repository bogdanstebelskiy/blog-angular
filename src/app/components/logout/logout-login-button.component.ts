import { Component } from '@angular/core';
import { AxiosService } from '../../axios.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-logout-login-button',
  imports: [MatButtonModule],
  templateUrl: './logout-login-button.component.html',
  styleUrl: './logout-login-button.component.scss',
})
export class LogoutLoginButtonComponent {
  constructor(private axiosService: AxiosService, private router: Router) {}

  isAuthenticated(): boolean {
    return this.axiosService.isAuthenticated();
  }

  handleAuthAction() {
    if (this.isAuthenticated()) {
      this.axiosService.removeAuthToken();
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.axiosService.removeAuthToken();
  }
}
