import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    "./src/graphql/**/*.graphql",
    "!./src/graphql/__generated__/schema.graphql",
  ],
  generates: {
    "./src/graphql/__generated__/resolvers.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../Context#Context",
      },
    },
    "./src/graphql/__generated__/schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
};

export default config;
