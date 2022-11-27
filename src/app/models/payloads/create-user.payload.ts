export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  imageUrl?: string;
  confirmPassword?: string;
}
