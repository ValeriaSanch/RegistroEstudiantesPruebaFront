import { HttpErrorResponse } from '@angular/common/http';

import type { ProblemDetail } from '../models/problem-detail.model';

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    const body = error.error as ProblemDetail | string | null | undefined;
    if (body && typeof body === 'object' && 'detail' in body && body.detail) {
      return body.detail;
    }
    if (typeof body === 'string' && body.trim().length > 0) {
      return body;
    }
    return error.message || `Error HTTP ${error.status}`;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Ocurrió un error inesperado.';
}
