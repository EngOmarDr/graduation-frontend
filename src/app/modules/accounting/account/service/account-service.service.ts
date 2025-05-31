import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { CreateAccountRequest } from '../models/request/create_account_request';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = `${environment.apiUrl}/accounts`;

  private http = inject(HttpClient);

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }

  getAccountById(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${id}`);
  }

  createAccount(Account: Partial<CreateAccountRequest>) {
    return this.http.post<Account>(this.apiUrl, Account);
  }

  updateAccount(
    id: String,
    Account: Partial<CreateAccountRequest>
  ): Observable<Account> {
    return this.http.put<Account>(`${this.apiUrl}/${id}`, Account);
  }

  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
