import { BaseProxy } from './base.proxy';
import { CourseModuleProxy } from './course-module.proxy';

export interface CourseProxy extends BaseProxy {
  name: string;
  description: string;
  imageUrl: string;
  category?: string;

  modules?: CourseModuleProxy[];
}
