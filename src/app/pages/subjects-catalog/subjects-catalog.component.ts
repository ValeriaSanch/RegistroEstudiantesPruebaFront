import { Component, inject, signal } from '@angular/core';

import { getApiErrorMessage } from '../../core/http/api-error.util';
import type { Subject } from '../../core/models/subject.model';
import { SubjectsApiService } from '../../core/services/subjects-api.service';
import { ErrorAlertComponent } from '../../shared/components/error-alert/error-alert.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';

@Component({
  selector: 'app-subjects-catalog',
  imports: [ErrorAlertComponent, LoadingStateComponent],
  templateUrl: './subjects-catalog.component.html',
  styleUrl: './subjects-catalog.component.css'
})
export class SubjectsCatalogComponent {
  private readonly subjectsApi = inject(SubjectsApiService);

  protected readonly subjects = signal<Subject[] | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  constructor() {
    this.reload();
  }

  protected reload(): void {
    this.loading.set(true);
    this.error.set(null);
    this.subjectsApi.getAll().subscribe({
      next: (list) => {
        this.subjects.set(list);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(getApiErrorMessage(err));
        this.subjects.set(null);
        this.loading.set(false);
      }
    });
  }
}
