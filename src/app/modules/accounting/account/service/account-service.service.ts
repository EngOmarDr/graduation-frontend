import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { CreateAccountRequest } from '../models/request/create_account_request';
import { AccountResponse } from '../models/response/account-response.model';
import { AccountTreeResponse } from '../models/response/account-tree-response';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = `${environment.apiUrl}/accounts`;

  private http = inject(HttpClient);

  getAccounts(): Observable<AccountResponse[]> {
    return this.http.get<AccountResponse[]>(this.apiUrl);
  }

  getAccountsTree() {
    return this.http.get<AccountTreeResponse[]>(this.apiUrl + '/tree');
  }

  getAccountById(id: number): Observable<AccountResponse> {
    return this.http.get<AccountResponse>(`${this.apiUrl}/${id}`);
  }

  createAccount(AccountResponse: Partial<CreateAccountRequest>) {
    return this.http.post<AccountResponse>(this.apiUrl, AccountResponse);
  }

  updateAccount(
    id: String,
    AccountResponse: Partial<CreateAccountRequest>
  ): Observable<AccountResponse> {
    return this.http.put<AccountResponse>(
      `${this.apiUrl}/${id}`,
      AccountResponse
    );
  }

  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchAccount(term: string = ''): Observable<AccountResponse[]> {
    return this.http.get<AccountResponse[]>(`${this.apiUrl}/search?q=${term}`);
  }
}
