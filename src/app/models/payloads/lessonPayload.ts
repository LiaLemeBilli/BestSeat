export interface LessonPayload {
  id?: number | null;
  title: string;
  description?: string;
  contentUrl?: string;
  moduleId: number;
}
