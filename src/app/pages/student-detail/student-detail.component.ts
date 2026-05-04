import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { getApiErrorMessage } from '../../core/http/api-error.util';
import type { Enrollment } from '../../core/models/enrollment.model';
import type { Student } from '../../core/models/student.model';
import { EnrollmentsApiService } from '../../core/services/enrollments-api.service';
import { StudentsApiService } from '../../core/services/students-api.service';
import { SubjectsApiService } from '../../core/services/subjects-api.service';
import type { Subject } from '../../core/models/subject.model';
import { EnrollSubjectFormComponent } from '../../shared/components/enroll-subject-form/enroll-subject-form.component';
import { EnrollmentListComponent } from '../../shared/components/enrollment-list/enrollment-list.component';
import { ErrorAlertComponent } from '../../shared/components/error-alert/error-alert.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { StudentEditFormComponent } from '../../shared/components/student-edit-form/student-edit-form.component';

@Component({
  selector: 'app-student-detail',
  imports: [
    RouterLink,
    ErrorAlertComponent,
    LoadingStateComponent,
    StudentEditFormComponent,
    EnrollmentListComponent,
    EnrollSubjectFormComponent
  ],
  templateUrl: './student-detail.component.html'
})
export class StudentDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly studentsApi = inject(StudentsApiService);
  private readonly enrollmentsApi = inject(EnrollmentsApiService);
  private readonly subjectsApi = inject(SubjectsApiService);

  protected readonly student = signal<Student | null>(null);
  protected readonly subjects = signal<Subject[]>([]);
  protected readonly loading = signal(true);
  protected readonly blocking = signal(false);
  protected readonly error = signal<string | null>(null);

  /** IDs de todas las materias presentes en inscripciones (evitar duplicados en catálogo). */
  protected readonly enrolledSubjectIds = computed(() => {
    const s = this.student();
    if (!s) {
      return [];
    }
    return s.enrollments.map((e) => e.subjectId);
  });

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((p) => {
      const id = p.get('id');
      if (!id) {
        return;
      }
      this.loadStudent(id);
      this.loadSubjects();
    });
  }

  private loadStudent(id: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.studentsApi.getById(id).subscribe({
      next: (s) => {
        this.student.set(s);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(getApiErrorMessage(err));
        this.student.set(null);
        this.loading.set(false);
      }
    });
  }

  private loadSubjects(): void {
    this.subjectsApi.getAll().subscribe({
      next: (list) => this.subjects.set(list),
      error: () => {}
    });
  }

  protected refreshStudent(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadStudent(id);
    }
  }

  protected onUpdate(payload: { fullName: string; documentNumber: string }): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    this.blocking.set(true);
    this.error.set(null);
    this.studentsApi.update(id, payload).subscribe({
      next: (s) => {
        this.student.set(s);
        this.blocking.set(false);
      },
      error: (err) => {
        this.error.set(getApiErrorMessage(err));
        this.blocking.set(false);
      }
    });
  }

  protected onDelete(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id || !confirm('¿Dar de baja al estudiante? Se cancelarán las inscripciones activas.')) {
      return;
    }
    this.blocking.set(true);
    this.error.set(null);
    this.studentsApi.delete(id).subscribe({
      next: () => {
        history.back();
      },
      error: (err) => {
        this.error.set(getApiErrorMessage(err));
        this.blocking.set(false);
      }
    });
  }

  protected onEnroll(subjectId: string): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    this.blocking.set(true);
    this.error.set(null);
    this.enrollmentsApi.enroll(id, { subjectId }).subscribe({
      next: () => {
        this.blocking.set(false);
        this.refreshStudent();
      },
      error: (err) => {
        this.error.set(getApiErrorMessage(err));
        this.blocking.set(false);
      }
    });
  }

  protected onCancelEnrollment(e: Enrollment): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (
      !id ||
      !confirm(`¿Cancelar inscripción en «${e.subjectName}»?`)
    ) {
      return;
    }
    this.blocking.set(true);
    this.error.set(null);
    this.enrollmentsApi.cancel(id, e.enrollmentId).subscribe({
      next: () => {
        this.blocking.set(false);
        this.refreshStudent();
      },
      error: (err) => {
        this.error.set(getApiErrorMessage(err));
        this.blocking.set(false);
      }
    });
  }
}
