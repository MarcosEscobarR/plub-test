import { Role } from 'src/commons/enums/roles';

export class UserResponseDto {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
