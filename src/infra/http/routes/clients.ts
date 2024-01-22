import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ClientsController } from "../contorllers";
import { defaultItemResponseType } from ".";



const clientsController = new ClientsController()

export const clientsRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: Error) => void
) => {
  fastify.get('/',
  {
    schema: {
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
  fastify.get('/:id/coordinates', clientsController.findCoordinate)
  fastify.get('/:id',  {
    schema: {
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
      body: {
        type: 'object',
        required: ['name', 'email', 'phoneNumber'], // Specify required properties
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          phoneNumber: { type: 'string' },
          // ... other properties in the request body
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
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
      body: {
        type: 'object',
        required: ['name', 'email', 'phoneNumber', 'latitude', 'longitude'], // Specify required properties
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          phoneNumber: { type: 'string' },
          latitude: { type: 'number' },
          longitude: { type: 'number' },
          // ... other properties in the request body
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
