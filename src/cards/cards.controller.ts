import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { CreateCardDto } from './dtos/create-card.dto';
import { CardsService } from './cards.service';
import { CardType } from './cards.enum';

@Controller('cards')
export class CardsController {

    constructor(private cardsService: CardsService) { }
    
    @Post("/trello-manager")
    async createCard(@Body() body: CreateCardDto) {
        return await this.cardsService.createCard(body);
    }

    @Get("/trello-manager/:type")
    async getCards(@Param() type: CardType) {
        return await this.cardsService.getCards(type);
    }

    @Get("/trello-manager/:type/:id")
    async getCard(@Param('type') type: CardType, @Param('id') id: number) {
        return await this.cardsService.getCard(type, id);
    }

    @Delete("/trello-manager/:type/:id")
    async deleteCard(@Param('type') type: CardType, @Param('id') id: number) {
        return await this.cardsService.deleteCard(type, id);
    }

}
