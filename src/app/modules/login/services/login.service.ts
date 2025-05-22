import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment.development';
import { CookieKeys } from '../../../core/constants/cookie-keys';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<{token:string}>(`${environment.apiUrl}/auth/login`, body).pipe(
      tap(response => {
        this.cookieService.set(CookieKeys.TOKEN,response.token);
      }));
  }
}
