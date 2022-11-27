export interface LessonPayload {
  id?: number | null;
  title: string;
  description?: string;
  videoUrl?: string;
  courseModuleId: number;
}
