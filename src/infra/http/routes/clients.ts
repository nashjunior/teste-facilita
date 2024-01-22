import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ClientsController } from "../contorllers";
import { defaultAuditTypes, defaultItemResponseType } from ".";



const clientsController = new ClientsController()

export const clientsRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: Error) => void
) => {
  fastify.get('/',
  {
    schema: {
      //@ts-expect-error type not existsnt for key tags
      tags:['Client'],
      querystring: {
        type: 'object',
        properties: {
          // Define optional query parameters
          query: { type: 'string' },
          query_fields: {type: 'string'},
          page: {type: 'number'},
          per_page: {type: 'number'},
          // ... other query parameters
        },
      },

      response: {
        200: {
          type: 'object',
          properties: {
            items: {
              type: 'array',
              items: {
                type: 'object',
                ...defaultItemResponseType
              }
            },
            total: {type: 'number'},
            totalPage: {type: 'number'},
            currentPage: {type: 'number'},
            perPage: {type: 'number'},
            lastPage: {type: 'number'},
            sort: {
              type: 'array',
              items: {type: 'string'}
            },
            orderSort: {
              type: 'array',
              items: {type: 'string' , format: 'ASC | DESC'}
            },
            filter: {
              type: 'object',
              properties: {
                fields: {
                  type: 'array',
                  items: {type: 'string'}
                },
                query: {type: 'string'}
              }
            }
          }
        }
      }}
    },
  clientsController.list)
  fastify.get('/:id/coordinates',
  {
    schema: {
      //@ts-expect-error type not existsnt for key tags
      tags:['Client'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string',format: 'uuid'},
            clientId: {type: 'string',format: 'uuid'},
            latitude: {type: 'number'},
            longitude: {type: 'number'},
          }
        },
      },
    },
  }
  ,clientsController.findCoordinate)
  fastify.get('/:id',  {
    schema: {
      //@ts-expect-error type not existsnt for key tags
      tags:['Client'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          ...defaultItemResponseType
        },
      },
    },
  }, clientsController.find)
  fastify.post('/',
  {
    schema: {
      //@ts-expect-error type not existsnt for key tags
      tags:['Client'],
      body: {
        type: 'object',
        required: ['name', 'email', 'phoneNumber'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          phoneNumber: { type: 'string' },
        },
      },
      response: {
        201: {
          type: 'object',
          ...defaultItemResponseType
        },
      },
    },
  },
  clientsController.create)
  fastify.put('/:id',
  {
    schema: {
      //@ts-expect-error type not existsnt for key tags
      tags:['Client'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
      body: {
        type: 'object',
        required: ['name', 'email', 'phoneNumber', 'latitude', 'longitude'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          phoneNumber: { type: 'string' },
          latitude: { type: 'number' },
          longitude: { type: 'number' },
        },
      },
      response: {
        200: {
          type: 'object',
          ...defaultItemResponseType
        },
      },
    },
  },
  clientsController.update)
  fastify.delete('/:id',
  {
    schema: {
      //@ts-expect-error type not existsnt for key tags
      tags:['Client'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
      response: {
        204: {
          type: 'null',
          description: 'No Content',
        },
      },
    }
  },
  clientsController.delete)
  done()
}
