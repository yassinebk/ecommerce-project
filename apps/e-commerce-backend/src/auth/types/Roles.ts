import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  DEV = 'developper',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'role of user',
});
