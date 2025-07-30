import { UserProfileT } from '@/features/profile/';
import { createLocalPersistStore } from '@/lib/utils';
interface AuthStore {
  profile: UserProfileT;
}

// good one
export const useAuthStore = createLocalPersistStore<AuthStore>(
  set => ({
    profile: {} as UserProfileT,
    setProfile: (profile: UserProfileT) => set(() => ({ profile })),
  }),
  'profileStore'
);
