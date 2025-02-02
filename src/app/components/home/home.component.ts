import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AxiosService } from '../../axios.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private userService: UserService,
    private axiosService: AxiosService
  ) {}

  isAuthenticated(): boolean {
    return this.axiosService.isAuthenticated();
  }

  getUsername(): string {
    return this.userService.getUsername();
  }
}
