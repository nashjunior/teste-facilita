import { errorMiddleware } from "#infra/http/middlewares/error";
import { generateRoutes } from "#infra/http/routes";
import fastifyCors from "@fastify/cors";
import fastify from "fastify";

const server = fastify({
  logger: true,
  bodyLimit: 20000,
});


generateRoutes(server)
server.register(fastifyCors);
server.setErrorHandler(errorMiddleware);

export {server}
