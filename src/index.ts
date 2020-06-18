import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { AuthorResolver } from "./resolvers/AuthorResolver";
import { BookResolver } from "./resolvers/BookResolver";

async function main() {
  try {
    await createConnection();

    const schema = await buildSchema({
      resolvers: [AuthorResolver, BookResolver],
    });

    const server = new ApolloServer({
      schema,
    });

    const app = express();

    server.applyMiddleware({ app });

    app.listen(4000, () => {
      console.log(
        "GraphQL Playground running on http://localhost:4000/graphql"
      );
    });
  } catch (err) {
    console.log(err);
  }
}

main();
