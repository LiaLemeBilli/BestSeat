import { LessonPayload } from './lessonPayload';

export interface ModulePayload {
  id?: number | null;
  title: string;
  order: number;

  lessons?: LessonPayload[];

  isOpened?: boolean;
}
