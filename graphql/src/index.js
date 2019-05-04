const { ApolloServer, gql } = require("apollo-server-lambda");

const STAGE = process.env.DEPLOYMENT_STAGE || "dev";

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!"
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: `/${STAGE}/graphql`
  }
});

exports.graphqlHandler = server.createHandler();
