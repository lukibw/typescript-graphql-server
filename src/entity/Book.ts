import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Author } from "./Author";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Book extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column({ unique: true })
  title: string;

  @Field()
  @Column()
  pages: number;

  @Field(() => Author)
  @ManyToOne(() => Author, author => author.books, { onDelete: "CASCADE" })
  author: Author;

  @Column()
  authorId: number;
}
