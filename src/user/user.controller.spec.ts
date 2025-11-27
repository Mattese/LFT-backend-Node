import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { Sex } from './enums/sex.enum';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getById', () => {
    it('should return a UserDto', () => {
      const result = controller.getById(1);

      expect(result).toBeDefined();
      expect(result?.firstName).toBe('Jmeno');
      expect(result?.lastName).toBe('Prijmeni');
      expect(result?.nickName).toBe('testovaci user');
      expect(result?.sex).toBe(Sex.MALE);
      expect(result?.dateOfBirth).toBeDefined();
    });
  });
});
