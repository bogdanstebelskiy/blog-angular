import { Injectable } from '@angular/core';
import { UserResponse } from '../../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: UserResponse | null | undefined;

  setUser(userData: UserResponse) {
    this.user = userData;
    localStorage.setItem('user', JSON.stringify(userData));
  }

  getUser(): any {
    if (!this.user) {
      const storedUser = localStorage.getItem('user');
      this.user = storedUser ? JSON.parse(storedUser) : null;
    }
    return this.user;
  }

  getUsername(): string {
    const user = this.getUser();
    return user ? user.username : '';
  }

  getId(): string {
    const user = this.getUser();
    return user ? user.id : '';
  }

  clearUser(): void {
    this.user = null;
    localStorage.removeItem('user');
  }
}
