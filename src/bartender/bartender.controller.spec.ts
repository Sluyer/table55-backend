import { Test, TestingModule } from '@nestjs/testing';
import { BartenderController } from './bartender.controller';

describe('BartenderController', () => {
  let controller: BartenderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BartenderController],
    }).compile();

    controller = module.get<BartenderController>(BartenderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
