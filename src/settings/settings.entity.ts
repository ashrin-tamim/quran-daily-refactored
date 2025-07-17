import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Settings {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dailyVerseCount: number;

    @Column()
    firstTimePopupShown: boolean;    
}
