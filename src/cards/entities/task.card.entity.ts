import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { CardCategory } from "../cards.enum";

@Entity()
export class TaskCard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    category: CardCategory;
}