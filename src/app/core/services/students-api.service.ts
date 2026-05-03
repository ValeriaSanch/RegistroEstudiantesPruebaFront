import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { API_V1 } from '../api/api.constants';
import type { RegisterStudentRequest, Student, StudentSummary, UpdateStudentRequest } from '../models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentsApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}${API_V1}/students`;

  getAll(): Observable<StudentSummary[]> {
    return this.http.get<StudentSummary[]>(this.baseUrl);
  }

  getById(studentId: string): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${studentId}`);
  }

  register(body: RegisterStudentRequest): Observable<Student> {
    return this.http.post<Student>(this.baseUrl, body);
  }

  update(studentId: string, body: UpdateStudentRequest): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/${studentId}`, body);
  }

  delete(studentId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${studentId}`);
  }
}
