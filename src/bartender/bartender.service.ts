import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BartenderService {
  constructor(private readonly db: PrismaService) {}

  /** Get info about table and establishment */
  async getTable(id: string) {
    const table = await this.db.table.findUnique({
      where: {
        id,
      },
      include: {
        establishment: true,
      },
    });

    if (table) {
      return table;
    } else {
      throw new BadRequestException('ERR_TABLE_NOT_FOUND');
    }
  }

  /** Get items, by category, with pagination */
  async getCarte(
    establishmentId: string,
    page: string,
    limit: string,
  ): Promise<Category[]> {
    const items: Category[] = await this.db.category.findMany({
      where: {
        establishmentId,
      },
      include: {
        Item: {
          where: {
            establishmentId,
          },
        },
      },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
    });

    if (items && items.length > 0) {
      return items;
    } else {
      throw new NotFoundException('ERR_ITEMS_NOT_FOUND');
    }
  }

  /*  await this.db.item.create({
    data: {
      name: 'Get27',
      description: 'Liqueur de menthe',
      image:
        'https://www.get27.fr/wp-content/uploads/2019/11/GET27-70cl-1.png',
      price: 10,
      categoryId: 1,
      establishmentId,
      isAlcoholic: true,
    },
  }); */
}
