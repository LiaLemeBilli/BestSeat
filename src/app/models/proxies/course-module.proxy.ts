import { BaseProxy } from './base.proxy';
import { LessonProxy } from './lesson.proxy';

export interface CourseModuleProxy extends BaseProxy {
  title: string;
  lessons: LessonProxy[];
}
