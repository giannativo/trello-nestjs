import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BugCard } from './entities/bug.card.entity';
import { IssueCard } from './entities/issue.card.entity';
import { TaskCard } from './entities/task.card.entity';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [TypeOrmModule.forFeature([BugCard, IssueCard, TaskCard])],
})
export class CardsModule {}
