import React from 'react';
import { useUsers, User } from '@/features/users';
import { LoadingIndicator, ErrorComponent } from '@/components';
import { cn } from '@/lib/utils';

const UserList: React.FC = () => {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <LoadingIndicator />;
  if (error) return <ErrorComponent />;

  return (
    <ul className='space-y-1'>
      {users?.map((user: User) => (
        <li key={user.id} className='flex items-center px-4 py-2'>
          <p className='text-base text-foreground'>
            {user.first_name} -{' '}
            <a
              href={`mailto:${user.email}`}
              className={cn(
                'text-blue-500 visited:text-blue-500 underline-offset-4 hover:underline',
                'transition-colors cursor-pointer'
              )}
            >
              {user.email}
            </a>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
