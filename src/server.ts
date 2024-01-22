import { server } from "./app";

const loadApp = async () => {
  try {

  await server.register(require('@fastify/swagger-ui'), {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
  })


    await server.ready()
    await server.swagger()


    server.listen(
      {
        port: Number.parseInt(process.env.PORT ?? '4000', 10),
        host: '0.0.0.0',
      },
      async err => {
        if (err) throw err;
      },
    );
  } catch (error) {
    server.log.error((error as Error).message);

    process.exit(1);
  }
};

loadApp()
