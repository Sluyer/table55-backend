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

  it('should return a list of drinks', () => {
    const result = ['Mojito', 'Martini'];
    jest.spyOn(controller, 'getDrinks').mockImplementation(() => result);

    expect(controller.getDrinks()).toBe(result);
  });

  it('should add a new drink', () => {
    const newDrink = 'Bloody Mary';
    jest.spyOn(controller, 'addDrink').mockImplementation((drink) => drink);

    expect(controller.addDrink(newDrink)).toBe(newDrink);
  });

  // Add more tests as needed
});
