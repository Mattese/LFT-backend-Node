import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Sex } from '../enums/sex.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ type: 'varchar', length: 30, nullable: true })
  nickName: string | null;

  @Column({ type: 'varchar' })
  sex: Sex;
}
