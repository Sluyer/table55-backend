import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

class MockPrismaService {
  table = {
    findUnique: jest.fn(),
    findMany: jest.fn(),
  };

  category = {
    findMany: jest.fn(),
  };
}

class LocalPrismaService {
  table = {
    findUnique: (params: any) => {
      // Implement your logic here
    },
    findMany: () => {
      // Implement your logic here
    },
  };

  category = {
    findMany: () => {
      // Implement your logic here
    },
  };
}

describe('PrismaService', () => {
  let service: LocalPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useClass: MockPrismaService,
        },
      ],
    }).compile();

    service = module.get<LocalPrismaService>(LocalPrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call table.findUnique', async () => {
    const findUniqueSpy = jest.spyOn(service.table, 'findUnique');
    await service.table.findUnique({ where: { id: 1 } });
    expect(findUniqueSpy).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should call table.findMany', async () => {
    const findManySpy = jest.spyOn(service.table, 'findMany');
    await service.table.findMany();
    expect(findManySpy).toHaveBeenCalled();
  });

  it('should call category.findMany', async () => {
    const findManySpy = jest.spyOn(service.category, 'findMany');
    await service.category.findMany();
    expect(findManySpy).toHaveBeenCalled();
  });
});
