import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { BranchResponse } from '../models/response/branch-response';
import { BranchRequest } from '../models/request/branch-request';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private apiUrl = `${environment.apiUrl}/branches`;
  private http = inject(HttpClient);

  getBranches(): Observable<BranchResponse[]> {
    return this.http.get<BranchResponse[]>(this.apiUrl);
  }

  getBranchById(id: number): Observable<BranchResponse> {
    return this.http.get<BranchResponse>(`${this.apiUrl}/${id}`);
  }

  createBranch(branch: BranchRequest) {
    return this.http.post<BranchResponse>(this.apiUrl, branch);
  }

  updateBranch(id: number, branch: BranchRequest): Observable<BranchResponse> {
    return this.http.put<BranchResponse>(`${this.apiUrl}/${id}`, branch);
  }

  deleteBranch(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
