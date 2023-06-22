import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CardsController],
  providers: [CardsService, PrismaService],
})
export class CardsModule {}
