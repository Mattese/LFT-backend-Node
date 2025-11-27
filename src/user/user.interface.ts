import { Sex } from './enums/sex.enum';

export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  nickName: string | null;
  sex: Sex;
}
