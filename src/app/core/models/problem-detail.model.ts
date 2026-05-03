/** Cuerpo JSON del middleware global (RFC 7807 simplificado). */
export interface ProblemDetail {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  traceId?: string;
}
