import { ModulePayload } from './module.payload';

export interface CoursePayload {
  name: string;
  category: string;
  author?: string;
  description: string;

  modules?: ModulePayload[];
}
