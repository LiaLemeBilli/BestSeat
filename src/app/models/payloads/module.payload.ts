import { LessonPayload } from './lessonPayload';

export interface ModulePayload {
  id?: number | null;
  title: string;
  courseId: number;
}
