const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require("graphql");

const lambdaPlayground = require("graphql-playground-middleware-lambda")
  .default;

const getGreeting = firstName => `Hello, ${firstName}.`;

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      greeting: {
        args: {
          firstName: {
            name: "firstName",
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        type: GraphQLString,
        resolve: (parent, args) => getGreeting(args.firstName)
      }
    }
  })
});

// We want to make a GET request with ?query=<graphql query>
// The event properties are specific to AWS. Other providers will differ.
module.exports.graphqlHandler = async (event, context, callback) => {
  const rootValue = {};
  const contextValue = {};
  try {
    const body = JSON.parse(event.body);
    console.debug(body);
    const result = await graphql(
      schema,
      body.query,
      rootValue,
      contextValue,
      body.variables,
      body.operationName
    );
    console.debug(result);
    callback(null, { statusCode: 200, body: JSON.stringify(result) });
  } catch (error) {
    console.error(error);
    callback(error);
  }
};

module.exports.playgroundHandler = lambdaPlayground({
  endpoint: "/dev/graphql"
});
