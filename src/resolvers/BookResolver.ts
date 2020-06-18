import { Book } from "../entity/Book";
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  FieldResolver,
  Root,
} from "type-graphql";
import { Author } from "../entity/Author";

@Resolver(() => Book)
export class BookResolver {
  @FieldResolver()
  async author(@Root() book: Book): Promise<Author> {
    const author = await Author.findOne(book.authorId);
    if (!author) {
      throw new Error("Could not find an author");
    }
    return author;
  }
  @Query(() => [Book])
  async allBooks() {
    const books = await Book.find();
    return books;
  }
  @Query(() => Book)
  async getBookById(@Arg("id") id: number) {
    const book = await Book.findOne(id);
    if (!book) {
      throw new Error("Book not found");
    }
    return book;
  }
  @Query(() => Book)
  async getBookByTitle(@Arg("title") title: string) {
    const book = await Book.findOne({ where: { title } });
    if (!book) {
      throw new Error("Book not found");
    }
    return book;
  }
  @Query(() => Book)
  async getBooksByAuthor(@Arg("author") name: string) {
    const author = await Author.findOne({ where: { name } });
    if (!author) {
      throw new Error("Author with this name does not exist");
    }
    return author.books;
  }
  @Mutation(() => Book)
  async addBook(
    @Arg("authorId") authorId: number,
    @Arg("title") title?: string,
    @Arg("pages") pages?: number
  ) {
    const author = await Author.findOne(authorId);
    if (!author) {
      throw new Error("Author does not exist");
    }
    const book = new Book();
    book.author = author;
    book.authorId = authorId;
    if (title) book.title = title;
    if (pages) book.pages = pages;
    await book.save();
    return book;
  }
  @Mutation(() => String)
  async removeBook(@Arg("id") id: number) {
    const book = await Book.findOne(id);
    if (!book) {
      throw new Error("Book not found");
    }
    await book.remove();
    return "Successfully removed a book";
  }
  @Mutation(() => Book)
  async updateBook(
    @Arg("id") id: number,
    @Arg("pages", { nullable: true }) pages: number,
    @Arg("title", { nullable: true }) title: string
  ) {
    if (!id) {
      throw new Error("Invalid data");
    }
    const book = await Book.findOne(id);
    if (!book) {
      throw new Error("Book not found");
    }
    if (title) book.title = title;
    if (pages) book.pages = pages;
    await book.save();
    return book;
  }
}
