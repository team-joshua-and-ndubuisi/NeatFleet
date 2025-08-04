import { FunctionComponent, PropsWithChildren } from 'react';

const ProfileContainer: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className=' lg:w-2/3 md:w-2/3 max-w-7xl mx-auto px-4 py-30 pb-50'>{children}</div>;
};

export default ProfileContainer;
