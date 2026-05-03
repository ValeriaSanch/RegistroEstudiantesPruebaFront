import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-alert',
  imports: [],
  templateUrl: './error-alert.component.html',
  styleUrl: './error-alert.component.css'
})
export class ErrorAlertComponent {
  readonly message = input.required<string>();
  readonly dismissed = output<void>();

  onClose(): void {
    this.dismissed.emit();
  }
}
