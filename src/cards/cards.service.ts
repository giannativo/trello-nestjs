import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dtos/create-card.dto';
import { CardType } from './cards.enum';
import { PrismaService } from 'src/prisma.service';
import { IssueCard, TaskCard, BugCard, Prisma } from '@prisma/client';

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
        let cardType = card.type;
        delete card['type'];
        switch (cardType) {
            case CardType.ISSUE:
                return await this.createIssueCard(card as Prisma.IssueCardCreateInput);
            case CardType.TASK:
                return await this.createTaskCard(card as Prisma.TaskCardCreateInput);
            case CardType.BUG:
                return await this.createBugCard(card as Prisma.BugCardCreateInput);
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
        return await this.prisma.issueCard.create({data});
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
    async createTaskCard(data: Prisma.TaskCardCreateInput) {
        this.validateTaskCard
        return await this.prisma.taskCard.create({data});
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
    async createBugCard(data: Prisma.BugCardCreateInput) {
        data.title = 'Bug'+'-'+'RandomWord'+'-'+ Math.floor(Math.random() * 1000);
        return await this.prisma.bugCard.create({data});
    }

    /**
     * This method returns all cards of a given type.
     * 
     * @param {CardType} type - The type of card.
     * @returns {Promise<IssueCard[] | TaskCard[] | BugCard[]>} The cards of the given type.
     */
    async getCards(cardType: CardType) {
        switch (cardType['type']) {
            case CardType.ISSUE:
                return this.prisma.issueCard.findMany({});
            case CardType.TASK:
                return this.prisma.taskCard.findMany({});
            case CardType.BUG:
                return this.prisma.bugCard.findMany({});
        };
    }

    /**
     * This method returns a card of a given type and id.
     * 
     * @param {CardType} type - The type of card.
     * @param {number} id - The id of the card.
     * @returns {Promise<IssueCard | TaskCard | BugCard>} The card of the given type and id.
     */
    async getCard(cardType: CardType, id: number) {
        switch (cardType) {
            case CardType.ISSUE:
                return this.prisma.issueCard.findUnique({
                    where: {id: Number(id)},
                  });
            case CardType.TASK:
                return this.prisma.taskCard.findUnique({
                    where: {id: Number(id)},
                  })
            case CardType.BUG:
                return this.prisma.bugCard.findUnique({
                    where: {id: Number(id)},
                  })
        };
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
        let card = await this.getCard(type, id);
        if (!card) {
            throw new NotFoundException('Card not found');
        }
        switch (type) {
            case CardType.ISSUE:
                return this.prisma.issueCard.delete({
                    where: {id: Number(id)},
                  });
            case CardType.TASK:
                return this.prisma.taskCard.delete({
                    where: {id: Number(id)},
                  })
            case CardType.BUG:
                return this.prisma.bugCard.delete({
                    where: {id: Number(id)},
                  })
        };
    }
}
