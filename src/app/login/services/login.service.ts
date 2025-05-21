import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${environment.apiUrl}/auth/login`, body);
  }
}
