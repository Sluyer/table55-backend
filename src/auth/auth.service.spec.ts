import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a JWT token when login is called', async () => {
    const result = { token: 'jwt-token' };
    jest.spyOn(service, 'login').mockImplementation(async () => result);

    expect(await service.login({ email: 'test', password: 'test' })).toBe(result);
  });

  it('should validate a user', async () => {
    const user = { userId: 1, username: 'test' };
    jest.spyOn(service, 'validateUser').mockImplementation(async () => user);

    expect(await service.validateUser('test', 'test')).toBe(user);
  });
});
