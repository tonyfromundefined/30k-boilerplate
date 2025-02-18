import fp from "fastify-plugin";
import { createSchema, createYoga, useSchema } from "graphql-yoga";

export default fp(
  (app) => {
    const schema = createSchema({
      typeDefs: `
        type Query {
          ping: String!
        }
      `,
      resolvers: {
        Query: {
          ping() {
            return "pong";
          },
        },
      },
    });

    const yoga = createYoga({
      schema,
    });

    app.route({
      method: ["GET", "POST", "OPTIONS"],
      url: yoga.graphqlEndpoint,
      async handler(req, reply) {
        const context = {};

        const response = await yoga.handleNodeRequestAndResponse(
          req,
          reply,
          context,
        );

        response.headers.forEach((value, key) => {
          reply.header(key, value);
        });

        reply.status(response.status);
        reply.send(response.body);

        return reply;
      },
    });
  },
  {
    name: "app.graphql",
  },
);
