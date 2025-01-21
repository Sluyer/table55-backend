import { IsString } from 'class-validator';

// Login Payload DTO
export class LoginPayloadDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

// Register Payload DTO
export class RegisterPayloadDto extends LoginPayloadDto {
  @IsString()
  surname: string;

  @IsString()
  lastname: string;

  @IsString()
  phone?: string;
}
