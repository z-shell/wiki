import * as graphQLPlugin from "@cloudflare/pages-plugin-graphql";

import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return "Hello, world!";
        },
      },
    },
  }),
});

const onRequest: PagesFunction = graphQLPlugin({
  schema,
  graphql,
});

export default onRequest;