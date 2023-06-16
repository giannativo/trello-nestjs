import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dtos/create-card.dto';
import { CardType } from './cards.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BugCard } from './entities/bug.card.entity';
import { TaskCard } from './entities/task.card.entity';
import { PrismaService } from 'src/prisma.service';
import { IssueCard, Prisma } from '@prisma/client';

/**
 * This service is responsible for creating, reading and deleting cards.
 */
@Injectable()
export class CardsService {

    constructor(
        private prisma: PrismaService
    ) {}

    /**
     * This method creates a card based on the type of card.
     * 
     * @param {CreateCardDto} card - The card to be created.
     * @returns {Promise<IssueCard | TaskCard | BugCard>} The created card.
     */
    async createCard(card: CreateCardDto) {
        switch (card.type) {
            case CardType.ISSUE:
                return await this.createIssueCard(card as Prisma.IssueCardCreateInput);
            case CardType.TASK:
                return await this.createTaskCard(card);
            case CardType.BUG:
                return await this.createBugCard(card);
        };
    }

    /**
     * This method validates the data of an issue card.
     * 
     * @param card - The card to be validated.
     * @throws {BadRequestException} - If the card data is not valid.
     */
    private async validateIssueCard(card: CreateCardDto) {
        if (!card.title || !card.description) {
            throw new BadRequestException('Title and description are required');
        }
    }

    /**
     * This method creates an issue card.
     * 
     * @param card - The card to be created.
     * @returns {Promise<IssueCard>} The created card.
     */
    async createIssueCard(data: Prisma.IssueCardCreateInput) {
        this.validateIssueCard
        delete data['type'];
        return await this.prisma.issueCard.create({
            data,
          });
    }

    /**
     * This method validates the data of a task card.
     *  
     * @param card - The card to be validated.
     * @throws {BadRequestException} - If the card data is not valid.
     */
    private async validateTaskCard(card: CreateCardDto) {
        if (!card.title || !card.category) {
            throw new BadRequestException('Title and category are required');
        }
    }

    /**
     * This method creates a task card.
     * 
     * @param card - The card to be created.
     * @returns {Promise<TaskCard>} The created card.
     */
    async createTaskCard(card: CreateCardDto) {
        this.validateTaskCard
/*        const taskCard = this.taskCardRepository.create(card);
        return await this.taskCardRepository.save(taskCard);*/
    }

    /**
     * This method validates the data of a bug card.
     * 
     * @param card - The card to be validated.
     * @throws {BadRequestException} - If the card data is not valid.
     */
    private async validateBugCard(card: CreateCardDto) {
        if (!card.description) {
            throw new BadRequestException('Description is required');
        }
    }

    /**
     * This method creates a bug card.
     * 
     * @param card - The card to be created.
     * @returns {Promise<BugCard>} The created card.
     * @todo Generate a random title function.
     */
    async createBugCard(card: CreateCardDto) {
        this.validateBugCard(card);
        card.title = 'Bug'+'-'+'RandomWord'+'-'+ Math.floor(Math.random() * 1000);
/*        const bugCard = this.bugCardRepository.create(card);
        return await this.bugCardRepository.save(bugCard);*/
    }

    /**
     * This method returns all cards of a given type.
     * 
     * @param {CardType} type - The type of card.
     * @returns {Promise<IssueCard[] | TaskCard[] | BugCard[]>} The cards of the given type.
     */
    async getCards(type: CardType) {
//        return this.getCardRepository(type).find();
    }

    /**
     * This method returns a card of a given type and id.
     * 
     * @param {CardType} type - The type of card.
     * @param {number} id - The id of the card.
     * @returns {Promise<IssueCard | TaskCard | BugCard>} The card of the given type and id.
     */
    async getCard(type: CardType, id: number) {
//        return this.getCardRepository(type).findOneBy({id});
    }

    /**
     * This method deletes a card of a given type and id.
     * 
     * @param {CardType} type - The type of card.
     * @param {number} id - The id of the card.
     * @returns {Promise<void>} The deleted card.
     * @throws {NotFoundException} - If the card is not found.
     */
    async deleteCard(type: CardType, id: number) {
/*        const repo = this.getCardRepository(type);
        let card = await repo.findOneBy({id})
        if (!card) {
            throw new NotFoundException('Card not found');
        }
        return repo.delete(card.id);*/
    }

    /**
     * This method returns the repository of a given type of card.
     * 
     * @param {CardType} type - The type of card.
     * @returns {Repository<IssueCard> | Repository<TaskCard> | Repository<BugCard>} The repository of the given type of card.
     */
    private getCardRepository(type: CardType) {
/*        switch (type) {
            case CardType.ISSUE:
                return this.issueCardRepository;
            case CardType.TASK:
                return this.taskCardRepository;
            case CardType.BUG:
                return this.bugCardRepository;
        };*/
    }
}
