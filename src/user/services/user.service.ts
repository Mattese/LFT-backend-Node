import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/user.dto';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        dateOfBirth: new Date(createUserDto.dateOfBirth),
        nickName: createUserDto.nickName ?? null,
        sex: createUserDto.sex,
        password: createUserDto.password,
        email: createUserDto.email,
      },
    });
  }

  async update(
    id: string,
    updateData: Partial<CreateUserDto>,
  ): Promise<User | null> {
    const existingUser = await this.findById(id);
    if (!existingUser) {
      return null;
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        ...(updateData.firstName !== undefined && {
          firstName: updateData.firstName,
        }),
        ...(updateData.lastName !== undefined && {
          lastName: updateData.lastName,
        }),
        ...(updateData.dateOfBirth !== undefined && {
          dateOfBirth: new Date(updateData.dateOfBirth),
        }),
        ...(updateData.nickName !== undefined && {
          nickName: updateData.nickName ?? null,
        }),
        ...(updateData.sex !== undefined && { sex: updateData.sex }),
      },
    });
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.user.delete({ where: { id } });
      return true;
    } catch (error) {
      // P2025 is Prisma's error code for "Record to delete does not exist"
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return false;
      }
      throw error;
    }
  }
}
