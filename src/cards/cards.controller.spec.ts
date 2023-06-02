import { Test, TestingModule } from '@nestjs/testing';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CardType } from './cards.enum';
import { DeleteResult } from 'typeorm';
import { CreateCardDto } from './dtos/create-card.dto';


describe('CardsController', () => {
  let controller: CardsController;
  let fakeCardsService: Partial<CardsService>;

  beforeEach(async () => {

    fakeCardsService = {
      createCard: (card: CreateCardDto) => {return Promise.resolve({id: 1, title: card.title, description: card.description})},
      getCards: (type: CardType) => {return Promise.resolve([{id: 1, title: 'Test', description: 'Test'}])},
      getCard: (type: CardType, id: number) => {return Promise.resolve({id: id, title: 'Test', description: 'Test'})},
      deleteCard: (type: CardType, id: number) => {
        const result: DeleteResult = {
          raw: {},
          affected: 1,
        };
        return Promise.resolve(result);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        { 
          provide: CardsService, 
          useValue: fakeCardsService
        },
      ],
    }).compile();

    controller = module.get<CardsController>(CardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a card', async () => {
    const card: CreateCardDto = {
      type: CardType.BUG,
      title: 'Test',
      description: 'Test',
    };
    const result = await controller.createCard(card);
    expect(result).toEqual({id: 1, title: 'Test', description: 'Test'});
  });

  it('should get cards', async () => {
    const result = await controller.getCards(CardType.BUG);
    expect(result).toEqual([{id: 1, title: 'Test', description: 'Test'}]);
  });

  it('should get a card', async () => {
    const result = await controller.getCard(CardType.BUG, 1);
    expect(result).toEqual({id: 1, title: 'Test', description: 'Test'});
  });

  it('should delete a card', async () => {
    const result = await controller.deleteCard(CardType.BUG, 1);
    expect(result).toEqual({raw: {}, affected: 1});
  });

});
