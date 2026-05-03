import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { API_V1 } from '../api/api.constants';
import type { Classmate } from '../models/classmate.model';

@Injectable({ providedIn: 'root' })
export class ClassmatesApiService {
  private readonly http = inject(HttpClient);

  list(studentId: string, subjectId: string): Observable<Classmate[]> {
    const url = `${environment.apiBaseUrl}${API_V1}/students/${studentId}/subjects/${subjectId}/classmates`;
    return this.http.get<Classmate[]>(url);
  }
}
