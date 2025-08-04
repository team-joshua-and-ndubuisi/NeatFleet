import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '@/features/users';

export const useUsers = () => {
  return useQuery({ queryKey: ['users'], queryFn: fetchUsers });
};
