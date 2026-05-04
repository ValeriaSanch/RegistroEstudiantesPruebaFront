import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-alert',
  imports: [],
  templateUrl: './error-alert.component.html'
})
export class ErrorAlertComponent {
  readonly message = input.required<string>();
  readonly dismissed = output<void>();

  onClose(): void {
    this.dismissed.emit();
  }
}
