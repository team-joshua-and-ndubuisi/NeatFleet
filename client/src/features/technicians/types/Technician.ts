import { User } from '@/features/users';

export interface Technician {
  id: string;
  current_rating: number;
  user: User;
}
