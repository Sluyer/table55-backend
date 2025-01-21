import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { BartenderService } from './bartender.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('BartenderService', () => {
  let service: BartenderService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BartenderService,
        {
          provide: PrismaService,
          useValue: {
            table: {
              findUnique: jest.fn(),
              // Mocking the table collection to include a "table"
              findMany: jest.fn().mockResolvedValue([
                { id: '1', name: 'Table 1' },
                { id: '2', name: 'Table 2' },
              ]),
            },
            category: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<BartenderService>(BartenderService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('getTable', () => {
    it('should return table info when found', async () => {
      const mockTable: { id: string; establishment: { id: string; name: string } } = {
        id: '123',
        establishment: { id: '1', name: 'Test Establishment' },
      };

      jest.spyOn(prisma.table, 'findUnique').mockResolvedValue(mockTable);

      const result = await service.getTable('123');
      expect(result).toEqual(mockTable);
    });

    it('should throw BadRequestException when table not found', async () => {
      jest.spyOn(prisma.table, 'findUnique').mockResolvedValue(null);

      await expect(service.getTable('123')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getCarte', () => {
    it('should return categories with items when found', async () => {
      const mockCategories = [
        {
          id: 1,
          name: 'Drinks',
          establishmentId: 1,
          createdAt: new Date(),
          description: 'Test description',
          Item: [{ id: 1, name: 'Coke', price: 2.5, establishmentId: 1 }],
        },
      ];

      jest.spyOn(prisma.category, 'findMany').mockResolvedValue(mockCategories);

      const result = await service.getCarte('1', '1', '10');
      expect(result).toEqual(mockCategories);
    });

    it('should throw NotFoundException when no items are found', async () => {
      jest.spyOn(prisma.category, 'findMany').mockResolvedValue([]);

      await expect(service.getCarte('1', '1', '10')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should handle invalid pagination inputs gracefully', async () => {
      const mockCategories = [
        {
          id: '1',
          name: 'Drinks',
          Item: [{ id: '1', name: 'Coke', price: 2.5, establishmentId: '1' }],
        },
      ];

      jest.spyOn(prisma.category, 'findMany').mockResolvedValue(mockCategories);

      const result = await service.getCarte('1', '0', '0'); // Page 0, Limit 0
      expect(result).toEqual(mockCategories);
    });
  });
});
