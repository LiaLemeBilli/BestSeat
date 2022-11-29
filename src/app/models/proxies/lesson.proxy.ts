import { BaseProxy } from './base.proxy';

export interface LessonProxy extends BaseProxy {
  title: string;
  description?: string;
  videoUrl: string;
  courseModuleId?: number;
}
