import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { StudentSummary } from '../../../core/models/student.model';

@Component({
  selector: 'app-student-summary-card',
  imports: [RouterLink],
  templateUrl: './student-summary-card.component.html'
})
export class StudentSummaryCardComponent {
  readonly student = input.required<StudentSummary>();
}
