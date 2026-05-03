/** Respuesta de inscripciones y detalle dentro de Student. */
export interface Enrollment {
  enrollmentId: string;
  subjectId: string;
  subjectName: string;
  credits: number;
  professorName: string;
  enrolledAt: string;
  isActive: boolean;
}

/** POST /api/v1/students/{studentId}/enrollments */
export interface EnrollStudentRequest {
  subjectId: string;
}
