import { UserProfileT } from '@/features/profile/';
import { createLocalPersistStore } from '@/lib/utils';
import { create } from 'zustand';
interface ProfileStore {
  profile: UserProfileT | null;
  setProfile: (profile: UserProfileT) => void;
}

// good one
export const useProfileStore = create<ProfileStore>(set => ({
  profile: null,
  setProfile: (profile: UserProfileT) => set(() => ({ profile })),
}));
// export const useProfileStore = createLocalPersistStore<ProfileStore>(
//   set => ({
//     profile: null,
//     setProfile: (profile: UserProfileT) => set(() => ({ profile })),
//   }),
//   'profileStore'
// );
