import type { Enrollment } from './enrollment.model';

/** GET /api/v1/students (lista). */
export interface StudentSummary {
  studentId: string;
  fullName: string;
  email: string;
}

/** GET /api/v1/students/{studentId}. */
export interface Student extends StudentSummary {
  documentNumber: string;
  createdAt: string;
  updatedAt?: string | null;
  isActive: boolean;
  totalCredits: number;
  enrollments: Enrollment[];
}

/** POST /api/v1/students */
export interface RegisterStudentRequest {
  fullName: string;
  email: string;
  documentNumber: string;
}

/** PUT /api/v1/students/{studentId} (el id va en la ruta; el backend también asigna studentId). */
export interface UpdateStudentRequest {
  fullName: string;
  documentNumber: string;
}
