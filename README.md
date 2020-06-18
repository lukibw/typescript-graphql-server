# Typescript GraphQL Server

An example of backend server built on Apollo, Express, Type-graphql, Typeorm and Postgres.

## Quick Start

Add your username, password and database to the ormconfig.json for postgres.

```
    yarn
    yarn start
```

## GraphQL Playground

You can run test queries and mutations on http://localhost:4000/graphql

```
mutation {
  addAuthor(name: "Brian Tracy") {
    id
    name
    books {
      title
    }
  }
}
```
