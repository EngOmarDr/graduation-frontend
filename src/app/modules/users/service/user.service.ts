import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { StorageKeys } from 'app/core/constants/storage-keys';
import { UserRequest } from '../models/request/user-request';
import { UserResponse } from '../models/response/user-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly apiUrl = `${environment.apiUrl}`;

  login(
    data: Partial<{ username: string; password: string }>
  ): Observable<any> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/auth/login`, data)
      .pipe(
        tap((response) => {
          this.cookieService.set(StorageKeys.TOKEN, response.token);
        })
      );
  }

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
