import { BaseProxy } from './base.proxy';
import { CourseModuleProxy } from './course-module.proxy';

export interface UserCourseProxy extends BaseProxy {
  userId: number;
  courseId: number;
}
