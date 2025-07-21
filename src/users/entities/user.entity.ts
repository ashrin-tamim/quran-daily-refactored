import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: () => "now()" })
  createdAt: Date;

  @Column({ default: () => "now()" })
  lastLoginAt: Date;
}
