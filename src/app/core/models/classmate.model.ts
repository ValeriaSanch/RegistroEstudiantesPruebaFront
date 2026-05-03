/** GET /api/v1/students/{studentId}/subjects/{subjectId}/classmates */
export interface Classmate {
  studentId: string;
  fullName: string;
}
