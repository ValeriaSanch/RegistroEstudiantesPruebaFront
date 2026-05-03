import { Component, input, output, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

import type { Subject } from '../../../core/models/subject.model';

@Component({
  selector: 'app-enroll-subject-form',
  imports: [FormsModule],
  templateUrl: './enroll-subject-form.component.html',
  styleUrl: './enroll-subject-form.component.css'
})
export class EnrollSubjectFormComponent {
  readonly subjects = input.required<Subject[]>();
  /** IDs de materias ya inscritas (activas o no) para excluir del select. */
  readonly enrolledSubjectIds = input<string[]>([]);

  readonly enroll = output<string>();

  protected subjectId = '';

  protected readonly options = computed(() => {
    const taken = new Set(this.enrolledSubjectIds());
    return this.subjects().filter((s) => !taken.has(s.subjectId));
  });

  protected onSubmit(): void {
    if (!this.subjectId) {
      return;
    }
    this.enroll.emit(this.subjectId);
    this.subjectId = '';
  }
}
