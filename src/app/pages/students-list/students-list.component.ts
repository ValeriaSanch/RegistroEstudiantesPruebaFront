import { Component, inject, signal } from '@angular/core';

import { getApiErrorMessage } from '../../core/http/api-error.util';
import type { RegisterStudentRequest, StudentSummary } from '../../core/models/student.model';
import { StudentsApiService } from '../../core/services/students-api.service';
import { ErrorAlertComponent } from '../../shared/components/error-alert/error-alert.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { StudentRegisterFormComponent } from '../../shared/components/student-register-form/student-register-form.component';
import { StudentSummaryCardComponent } from '../../shared/components/student-summary-card/student-summary-card.component';

@Component({
  selector: 'app-students-list',
  imports: [
    ErrorAlertComponent,
    LoadingStateComponent,
    StudentRegisterFormComponent,
    StudentSummaryCardComponent
  ],
  templateUrl: './students-list.component.html'
})
export class StudentsListComponent {
  private readonly studentsApi = inject(StudentsApiService);

  protected readonly students = signal<StudentSummary[] | null>(null);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);

  constructor() {
    this.reload();
  }

  protected reload(): void {
    this.loading.set(true);
    this.error.set(null);
    this.studentsApi.getAll().subscribe({
      next: (list) => {
        this.students.set(list);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(getApiErrorMessage(err));
        this.students.set(null);
        this.loading.set(false);
      }
    });
  }

  protected onRegister(body: RegisterStudentRequest): void {
    this.saving.set(true);
    this.error.set(null);
    this.studentsApi.register(body).subscribe({
      next: () => {
        this.saving.set(false);
        this.reload();
      },
      error: (err) => {
        this.error.set(getApiErrorMessage(err));
        this.saving.set(false);
      }
    });
  }
}
