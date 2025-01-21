import { Body, Controller, Post } from '@nestjs/common';
import { LoginPayloadDto, RegisterPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body() payload: LoginPayloadDto) {
    return this.authService.login(payload);
  }

  @Post('register')
  register(@Body() payload: RegisterPayloadDto) {
    return this.authService.register(payload);
  }
}
