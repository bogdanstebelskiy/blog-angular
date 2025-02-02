import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, UserRequest, UserResponse } from '../../interfaces/auth';
import { AxiosService } from '../../axios.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private axiosService: AxiosService) {}

  registerUser(userDetails: UserRequest) {
    return this.axiosService.request('POST', '/api/users', userDetails);
  }

  loginUser(userDetails: LoginRequest) {
    return this.axiosService.request('POST', '/login', userDetails);
  }
}
