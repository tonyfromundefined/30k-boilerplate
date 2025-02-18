import type { Resolvers } from "./__generated__/resolvers";

export const resolvers: Resolvers = {
  Query: {
    ping(parent, args, ctx) {
      return "pong";
    },
    something() {
      return "";
    },
  },
};
