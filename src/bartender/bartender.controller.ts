import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { BartenderService } from './bartender.service';

@Controller('bartender')
export class BartenderController {
  constructor(private readonly bartender: BartenderService) {}
  @Get(':id')
  async getTable(@Param('id') id: string) {
    return this.bartender.getTable(id);
  }

  @Get('carte/:id')
  async getCarte(
    @Param('id') id: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    if (!page || !limit) {
      throw new BadRequestException('ERR_INVALID_PAGINATION');
    }

    return this.bartender.getCarte(id, page, limit);
  }

  getDrinks(): string[] {
    return ['Mojito', 'Martini'];
  }

  addDrink(drink: string): string {
    return drink;
  }
}
