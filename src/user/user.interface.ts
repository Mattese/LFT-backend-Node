import { Sex } from '@prisma/client';

export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  nickName: string | null;
  sex: Sex;
}
