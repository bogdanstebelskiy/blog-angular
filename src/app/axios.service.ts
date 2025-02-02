import { Injectable } from '@angular/core';
import axios from 'axios';
import { UserResponse } from './interfaces/auth';
import { UserService } from './services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  constructor(private userService: UserService) {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.method = 'GET';
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  setAuthToken(token: string | null) {
    if (token !== null) {
      window.localStorage.setItem('auth_token', token);
    } else {
      window.localStorage.removeItem('auth_token');
    }
  }

  logout() {
    this.removeAuthToken();
    this.userService.clearUser();
    window.location.reload();
  }
  removeAuthToken() {
    localStorage.removeItem('auth_token');
  }

  request(method: string, url: string, data?: any): Promise<any> {
    let headers = {};

    if (this.getAuthToken() !== null) {
      headers = { Authorization: 'Bearer ' + this.getAuthToken() };
    }

    return axios({
      method: method,
      url: url,
      data: data,
    });
  }
}
