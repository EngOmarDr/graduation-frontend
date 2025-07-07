import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { UserRequest } from '../models/request/user-request';
import { UserResponse } from '../models/response/user-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}`;

  // login(data: { username: string; password: string; rememberMe: boolean }) {
  //     return this.http
  //       .post<LoginResponse>(`${environment.apiUrl}/auth/login`, data)
  //       .pipe(
  //         tap((response) => {
  //           if (data.rememberMe) {
  //             this.storageService.storageInLocal(response);
  //           } else {
  //             this.storageService.storageInCookie(response);
  //           }
  //         })
  //       );
  //   }

  createUser(data: UserRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  getAllUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.apiUrl}/users`);
  }

  getUserById(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/users/${id}`);
  }

  update(user: UserRequest, id: number): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.apiUrl}/users/${id}`, user);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}
