import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BugCard } from './entities/bug.card.entity';
import { IssueCard } from './entities/issue.card.entity';
import { TaskCard } from './entities/task.card.entity';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CardsController],
  providers: [CardsService, PrismaService],
  /*imports: [TypeOrmModule.forFeature([BugCard, IssueCard, TaskCard])],*/
})
export class CardsModule {}
