import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prismaService = moduleFixture.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prismaService.user.deleteMany({});
    await app.close();
  });

  it('/auth/register (POST) should create a new user', async () => {
    const userPayload = {
      username: 'testuser',
      password: 'testpassword',
    };

    await request(app.getHttpServer())
      .post('/auth/register')
      .send(userPayload)
      .expect(201);

    const createdUser = await prismaService.user.findFirst({
      where: { username: userPayload.username },
    });

    expect(createdUser).toBeDefined();
    expect(createdUser?.username).toBe(userPayload.username);
  });
});
