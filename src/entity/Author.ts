import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Book } from "./Book";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Author extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field(() => [Book])
  @OneToMany(() => Book, book => book.author)
  books: Book[];
}
