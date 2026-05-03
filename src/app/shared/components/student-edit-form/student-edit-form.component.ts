import { Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import type { Student } from '../../../core/models/student.model';

@Component({
  selector: 'app-student-edit-form',
  imports: [FormsModule],
  templateUrl: './student-edit-form.component.html',
  styleUrl: './student-edit-form.component.css'
})
export class StudentEditFormComponent {
  readonly student = input.required<Student>();
  readonly saved = output<{ fullName: string; documentNumber: string }>();

  protected readonly fullName = signal('');
  protected readonly documentNumber = signal('');

  constructor() {
    effect(() => {
      const s = this.student();
      this.fullName.set(s.fullName);
      this.documentNumber.set(s.documentNumber);
    });
  }

  protected onSubmit(): void {
    this.saved.emit({ fullName: this.fullName(), documentNumber: this.documentNumber() });
  }
}
