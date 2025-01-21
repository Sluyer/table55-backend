import { Test, TestingModule } from '@nestjs/testing';
import { QrService } from './qr.service';

describe('QrService', () => {
  let service: QrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QrService],
    }).compile();

    service = module.get<QrService>(QrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a QR code', async () => {
    const result = await service.generateQrCode('test data');
    expect(result).toBeDefined();
    expect(result).toContain('data:image/png;base64');
  });

  it('should validate a QR code', async () => {
    const qrCode = await service.generateQrCode('test data');
    const isValid = await service.validateQrCode(qrCode);
    expect(isValid).toBe(true);
  });
});
