import { ProfileT } from '@/features/profile/';
// import { createLocalPersistStore } from '@/lib/utils';
import { create } from 'zustand';
interface ProfileStore {
  profile: ProfileT | null;
  setProfile: (profile: ProfileT) => void;
}

// good one
export const useProfileStore = create<ProfileStore>(set => ({
  profile: null,
  setProfile: (profile: ProfileT) => set(() => ({ profile })),
}));
// export const useProfileStore = createLocalPersistStore<ProfileStore>(
//   set => ({
//     profile: null,
//     setProfile: (profile: UserProfileT) => set(() => ({ profile })),
//   }),
//   'profileStore'
// );
