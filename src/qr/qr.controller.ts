import { Controller } from '@nestjs/common';

@Controller('qr')
export class QrController {
  getQrCode(): string {
    return 'some-qr-code';
  }
}
