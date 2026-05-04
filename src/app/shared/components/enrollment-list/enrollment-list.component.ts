import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { Enrollment } from '../../../core/models/enrollment.model';

@Component({
  selector: 'app-enrollment-list',
  imports: [RouterLink],
  templateUrl: './enrollment-list.component.html'
})
export class EnrollmentListComponent {
  readonly studentId = input.required<string>();
  readonly enrollments = input.required<Enrollment[]>();
  readonly cancelRequest = output<Enrollment>();

  onCancel(e: Enrollment): void {
    this.cancelRequest.emit(e);
  }
}
