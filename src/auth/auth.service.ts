import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginPayloadDto, RegisterPayloadDto } from './dto/auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async login(payload: LoginPayloadDto) {
    // Find user by email
    const user = await this.prismaService.user.findFirst({
      where: {
        email: payload.email,
      },
    });
    if (!user) {
      throw new BadRequestException('ERR_INVALID_CREDENTIALS');
    }

    // Compare the provided password with the stored hashed password
    if (await compare(payload.password, user.hashedPassword)) {
      const payload = {
        email: user.email,
        id: user.id,
      };
      return {
        token: this.jwtService.sign(payload),
      };
    } else {
      throw new BadRequestException('ERR_INVALID_CREDENTIALS');
    }
  }

  async register(payload: RegisterPayloadDto) {
    const hashedPassword = await hash(payload.password, 10);
    try {
      const user = await this.prismaService.user.create({
        data: {
          hashedPassword,
          lastname: payload.lastname,
          surname: payload.surname,
          email: payload.email,
          phone: payload.phone,
        },
      });

      if (user) {
        const payload = {
          email: user.email,
          id: user.id,
        };
        return {
          token: this.jwtService.sign(payload),
        };
      }
    } catch (error) {
      console.error(error);
      throw new BadRequestException('ERR_REGISTER', { cause: error });
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    // implementation of validateUser
    return { userId: 1, username: 'test' };
  }
}
