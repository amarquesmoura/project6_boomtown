# Boomtown 🏙

This is a full stack project at RED Academy App Developer Program. In the back-end, it uses Postgres as the database server, Node.js with Express for web services and Apollo for GraphQL queries. It is a website for sharing goods, lending and borrowing them.

## Main Takeaways

In this project, I learned modern techonologies for integrating the back-end. Here are some of the main takeaways:

- Although not a new technology, SQL is a solid, tried and true way to create, read, update and delete (CRUD) data.
- Node.js brings the flexibility of Javascript to the server side. In conjunction with libraries like Express, it is very easy to instantiate a web server.
- RESTful APIs are a straightforward method to add and retrieve data from an HTTP server. However, they present limitations when the complexity of the data or the queries is high.
- To deal with more complex database interactions, GraphQL is a powerful tool. One can use a library like Apollo to integrate GraphQL into a web server as a middleware.

## Instructions for running the server

Commands must be run from the `server` directory:

### Installation

```bash
npm install
```

### Run

```bash
npm run start:dev
```

### Tests

Just linting:

```bash
npm run lint
```

Run linting, and fix any errors:

```bash
npm run lint:fix
```

Run Jest tests:

```
npm run jest
```

Run Jest tests, and watch for changes:

```bash
npm run jest:watch
```

Run all tests:

```bash
npm run test
```

## Instructions for running the Client

Commands must be run from the `client` directory:

### Installation

```bash
npm install
```

### Run

```bash
npm start
```

### Build

```bash
npm run build
```

### Tests

Just linting:

```bash
npm run lint
```

Run linting, and fix any errors:

```bash
npm run lint:fix
```

Run all tests:

```bash
npm run test
```
