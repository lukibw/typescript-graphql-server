import { Author } from "../entity/Author";
import { Book } from "../entity/Book";
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  FieldResolver,
  Root,
} from "type-graphql";

@Resolver(() => Author)
export class AuthorResolver {
  @FieldResolver()
  async books(@Root() author: Author): Promise<Book[]> {
    const books = await Book.find({ where: { author: { id: author.id } } });
    return books;
  }

  @Query(() => [Author])
  async allAuthors() {
    const authors = await Author.find();
    return authors;
  }
  @Query(() => Author)
  async getAuthorById(@Arg("id") id: number) {
    const author = await Author.findOne(id);
    if (!author) {
      throw new Error("Author not found");
    }
    return author;
  }
  @Mutation(() => Author)
  async addAuthor(@Arg("name") name: string) {
    if (!name) {
      throw new Error("Invalid data");
    }
    const author = new Author();
    author.name = name;
    await author.save();
    return author;
  }
  @Mutation(() => String)
  async removeAuthor(@Arg("id") id: number) {
    const author = await Author.findOne(id);
    if (!author) {
      throw new Error("Author not found");
    }
    await author.remove();
    return "Successfully removed an author";
  }
  @Mutation(() => Author)
  async updateAuthor(@Arg("name") name: string, @Arg("id") id: number) {
    if (!name) {
      throw new Error("Invalid data");
    }
    const author = await Author.findOne(id);
    if (!author) {
      throw new Error("Author not found");
    }
    author.name = name;
    await author.save();
    return author;
  }
}
