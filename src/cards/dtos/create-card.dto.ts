import { IsString, IsOptional } from "class-validator";
import { CardType } from "../cards.enum";
import { CardCategory } from "../cards.enum";

export class CreateCardDto {

    @IsString()
    type: CardType;

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    category?: CardCategory;
}