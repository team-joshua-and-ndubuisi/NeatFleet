import { useAuthStore } from '@/features/auth/stores/authStore';

export const useNavItems = () => {
  const { token } = useAuthStore();

  if (token) {
    return [
      { text: 'Home', path: '/' },
      { text: 'Book Now', path: '/book-service' },
      { text: 'Profile', path: '/profile' },
      { text: 'Logout', path: '/logout' },
    ];
  } else {
    return [
      { text: 'Home', path: '/' },
      { text: 'Book Now', path: '/book-service' },
      { text: 'Login', path: '/login' },
      { text: 'Signup', path: '/signup' },
    ];
  }
};
