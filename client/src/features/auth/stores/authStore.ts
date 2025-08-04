import { AuthResponseT, UserProfileT } from '@/features/auth/';
import { createLocalPersistStore } from '@/lib/utils';
interface AuthStore extends AuthResponseT {
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
  };
  setUserToken: (token: string) => void;
  initAuth: (auth: AuthResponseT) => void;
}

// good one
export const useAuthStore = createLocalPersistStore<AuthStore>(
  set => ({
    token: '',
    user: {
      firstName: '',
      lastName: '',
      isAdmin: false,
      id: '',
      email: '',
    },
    setUserToken: (token: string) => set(() => ({ token })),
    setUser: (user: UserProfileT) => set(() => ({ user })),

    initAuth: (auth: AuthResponseT) => {
      set(() => ({
        token: auth.token,
        user: {
          id: auth.user.id,
          firstName: auth.user.firstName,
          lastName: auth.user.lastName,
          email: auth.user.email,
          isAdmin: auth.user.isAdmin,
        },
      }));
    },
  }),
  'authStore'
);
