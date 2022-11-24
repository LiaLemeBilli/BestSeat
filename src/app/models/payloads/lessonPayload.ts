export interface LessonPayload {
  id?: number | null;
  name: string;
  description: string;
  contentUrl: string;
  order: number;

  isOpened?: boolean;
}
