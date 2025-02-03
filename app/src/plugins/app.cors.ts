import FastifyCors from "@fastify/cors";
import fp from "fastify-plugin";

export default fp(
  async (app) => {
    await app.register(FastifyCors, {
      preflightContinue: true,
    });
  },
  { name: "app.cors" },
);
