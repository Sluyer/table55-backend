import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { LoginPayloadDto, RegisterPayloadDto } from './dto/auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [PrismaService, AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a token', async () => {
      const LoginPayloadDto: LoginPayloadDto = { email: 'test', password: 'test' };
      const result = { token: 'token' };
      jest.spyOn(authService, 'login').mockImplementation(async () => result);

      expect(await controller.login(LoginPayloadDto)).toBe(result);
    });
  });

  describe('register', () => {
    it('should return a user', async () => {
      const RegisterPayloadDto: RegisterPayloadDto = { lastname: 'test', surname: 'test', email: 'test', password: 'test' };
      const result = { id: 1, username: 'test', token: 'token' };
      jest.spyOn(authService, 'register').mockImplementation(async (payload: RegisterPayloadDto) => result);

      expect(await controller.register(RegisterPayloadDto)).toBe(result);
    });
  });
});
