import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-state',
  imports: [],
  templateUrl: './loading-state.component.html'
})
export class LoadingStateComponent {
  readonly message = input('Cargando…');
}
