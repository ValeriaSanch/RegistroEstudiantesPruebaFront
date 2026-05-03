/** GET /api/v1/subjects */
export interface Subject {
  subjectId: string;
  name: string;
  credits: number;
  professorId: string;
  professorName: string;
}
