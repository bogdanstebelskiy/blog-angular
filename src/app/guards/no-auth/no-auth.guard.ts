import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AxiosService } from '../../axios.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private axiosService: AxiosService, private router: Router) {}

  canActivate(): boolean {
    if (this.axiosService.isAuthenticated()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
