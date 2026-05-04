import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import type { RegisterStudentRequest } from '../../../core/models/student.model';

@Component({
  selector: 'app-student-register-form',
  imports: [FormsModule],
  templateUrl: './student-register-form.component.html'
})
export class StudentRegisterFormComponent {
  readonly submitted = output<RegisterStudentRequest>();

  protected draft: RegisterStudentRequest = {
    fullName: '',
    email: '',
    documentNumber: ''
  };

  protected get registrationValid(): boolean {
    const d = this.draft;
    return (
      d.fullName.trim().length > 0 &&
      d.email.trim().includes('@') &&
      d.documentNumber.trim().length > 0
    );
  }

  protected onSubmit(): void {
    this.submitted.emit({ ...this.draft });
  }
}
