import { reactRouterFastify } from "@mcansh/remix-fastify/react-router";
import fp from "fastify-plugin";

import type http from "node:http";
import type http2 from "node:http2";
import type https from "node:https";
import type {
  FastifyInstance,
  FastifyRequest,
  RouteGenericInterface,
} from "fastify";

type Server =
  | http.Server
  | https.Server
  | http2.Http2Server
  | http2.Http2SecureServer;

declare module "react-router" {
  interface AppLoadContext {
    app: FastifyInstance;
    req: FastifyRequest<RouteGenericInterface, Server>;
  }
}

export default fp(
  async (app) => {
    await app.register(reactRouterFastify, {
      buildDirectory: "./dist/web",
      async getLoadContext(req) {
        return { app, req };
      },
    });
  },
  {
    name: "reactRouter",
    dependencies: ["app.env", "app.gracefulShutdown"],
  },
);
