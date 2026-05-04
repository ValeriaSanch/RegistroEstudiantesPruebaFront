import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { getApiErrorMessage } from '../../core/http/api-error.util';
import type { Classmate } from '../../core/models/classmate.model';
import { ClassmatesApiService } from '../../core/services/classmates-api.service';
import { ErrorAlertComponent } from '../../shared/components/error-alert/error-alert.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';

@Component({
  selector: 'app-classmates',
  imports: [RouterLink, ErrorAlertComponent, LoadingStateComponent],
  templateUrl: './classmates.component.html'
})
export class ClassmatesComponent {
  protected readonly route = inject(ActivatedRoute);
  private readonly classmatesApi = inject(ClassmatesApiService);

  protected readonly classmates = signal<Classmate[] | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const studentId = params.get('id');
      const subjectId = params.get('subjectId');
      if (!studentId || !subjectId) {
        return;
      }
      this.load(studentId, subjectId);
    });
  }

  private load(studentId: string, subjectId: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.classmatesApi.list(studentId, subjectId).subscribe({
      next: (list) => {
        this.classmates.set(list);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(getApiErrorMessage(err));
        this.classmates.set(null);
        this.loading.set(false);
      }
    });
  }
}
