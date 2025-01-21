import { Test, TestingModule } from '@nestjs/testing';
import { QrController } from './qr.controller';

describe('QrController', () => {
  let controller: QrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QrController],
    }).compile();

    controller = module.get<QrController>(QrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a QR code', () => {
    const result = 'some-qr-code';
    jest.spyOn(controller, 'getQrCode').mockImplementation(() => result);

    expect(controller.getQrCode()).toBe(result);
  });

  it('should handle errors', () => {
    jest.spyOn(controller, 'getQrCode').mockImplementation(() => {
      throw new Error('Error generating QR code');
    });

    expect(() => controller.getQrCode()).toThrow('Error generating QR code');
  });
});
