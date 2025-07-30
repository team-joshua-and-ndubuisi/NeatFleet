import { UserProfileT } from '@/features/profile/';
import { createLocalPersistStore } from '@/lib/utils';
interface ProfileStore {
  profile: UserProfileT;
}

// good one
export const useAuthStore = createLocalPersistStore<ProfileStore>(
  set => ({
    profile: {} as UserProfileT,
    setProfile: (profile: UserProfileT) => set(() => ({ profile })),
  }),
  'profileStore'
);
