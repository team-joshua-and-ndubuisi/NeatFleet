// export type UserType = {
//   first_name: string;
//   last_name: string;
//   email: string;
//   password: string;
//   phone: string;
// };

import { User as UserType } from '../../generated/prisma';

export type AuthedUser = UserType & {
  role: 'technician' | 'customer' | 'admin';
};
