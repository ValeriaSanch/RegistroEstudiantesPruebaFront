import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { API_V1 } from '../api/api.constants';
import type { EnrollStudentRequest, Enrollment } from '../models/enrollment.model';

@Injectable({ providedIn: 'root' })
export class EnrollmentsApiService {
  private readonly http = inject(HttpClient);

  private enrollmentsUrl(studentId: string): string {
    return `${environment.apiBaseUrl}${API_V1}/students/${studentId}/enrollments`;
  }

  list(studentId: string): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.enrollmentsUrl(studentId));
  }

  enroll(studentId: string, body: EnrollStudentRequest): Observable<Enrollment> {
    return this.http.post<Enrollment>(this.enrollmentsUrl(studentId), body);
  }

  cancel(studentId: string, enrollmentId: string): Observable<void> {
    return this.http.delete<void>(`${this.enrollmentsUrl(studentId)}/${enrollmentId}`);
  }
}
