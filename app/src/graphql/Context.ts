import type { FastifyInstance, FastifyRequest } from "fastify";

export interface Context {
  app: FastifyInstance;
  req: FastifyRequest;
}
