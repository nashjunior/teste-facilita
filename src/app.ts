import { errorMiddleware } from "#infra/http/middlewares";
import { generateRoutes } from "#infra/http/routes";
import fastifyCors from "@fastify/cors";
import fastify from "fastify";

const server = fastify({
  logger: true,
  bodyLimit: 20000,
});

server.register(require('@fastify/swagger'), {
  routePrefix: '/docs',
  swagger: {
      info: {
          title: 'Teste Facilita',
          description: 'Api',
          version: '0.1.0',
          // termsOfService: 'https://mywebsite.io/tos',
          contact: {
              name: 'Nash Junior',
              email: 'nashjuniorjj@gmail.com'
          }
      },
      externalDocs: {
          url: 'https://github.com/nashjunior/teste-facilita/tree/develop',
          description: 'Find more info here'
      },
      host: `127.0.0.1:${process.env.PORT ?? 4000}`,
      basePath: '',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        {name: 'Client',description: 'Client\'s API'},
        {name: 'Route',description: 'Route\'s API'},
      ],

      definitions: {
          Client: {
              type: 'object',
              required: ['id', 'email', 'phoneNumber', 'createdAt'],
              properties: {
                  id: {
                      type: 'string',
                      format: 'uuid'
                  },
                  email: {
                      type: 'string',
                      format: 'email'
                  },
                  phoneNumber: {
                    type: 'string',
                    format: '+XXXXXXXXX'
                  },
                  createdAt: {type: 'date',},
                  updatedAt: {type: 'date or null',},
                  deleted: {type: 'boolean', default: 'false'}

              }
          },
          Coordinate: {
            type: 'object',
            required: ['id', 'clientId', 'latitude', 'longiture', 'createdAt'],
            properties: {
                id: {
                    type: 'string',
                    format: 'uuid'
                },
                clientId: {
                  type: 'string',
                  format: 'uuid'
                },
                latitude: {
                    type: 'string',
                    format: 'email'
                },
                longiture: {
                  type: 'string',
                  format: '+XXXXXXXXX'
                },
                createdAt: {type: 'date',},
                updatedAt: {type: 'date or null',},
                deleted: {type: 'boolean', default: 'false'}
            }
        },
      }
  },
  uiConfig: {
      docExpansion: 'none', // expand/not all the documentations none|list|full
      deepLinking: true
  },
  uiHooks: {
      onRequest: function(request, reply, next) {
          next()
      },
      preHandler: function(request, reply, next) {
          next()
      }
  },
  staticCSP: false,
  transformStaticCSP: (header) => header,
  exposeRoute: true
})


generateRoutes(server)
server.register(fastifyCors);
server.setErrorHandler(errorMiddleware);



export {server}
