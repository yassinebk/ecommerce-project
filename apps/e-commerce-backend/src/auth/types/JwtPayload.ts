import { Role } from './Roles';

export type JwtPayload = {
  sub: number;
  email: string;
  role: Role;
  isVerified: boolean;
};
