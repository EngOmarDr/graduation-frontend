import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private apiUrl = `${environment.apiUrl}/categories`;
  private http = inject(HttpClient);
  constructor() {}

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.apiUrl);
  }

  getGroupById(id: number): Observable<Group> {
    return this.http.get<Group>(`${this.apiUrl}/${id}`);
  }

  createGroup(group: Partial<Group>) {
    return this.http.post<Group>(this.apiUrl, group);
  }

  updateGroup(id: number, group: Partial<Group>): Observable<Group> {
    return this.http.put<Group>(`${this.apiUrl}/${id}`, group);
  }

  deleteGroup(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
