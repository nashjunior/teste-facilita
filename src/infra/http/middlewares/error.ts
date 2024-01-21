import { InvalidUUIDError,NotFoundError,ValidationError } from '#seedwork/domain/errors';
import { EmailAlreadyExistentError } from '#clients/domain/errors';
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

type IError = {
  error: string;
  statusCode: number;
  message: any;
  where?: string;
};

export const errorMiddleware = (
  err: FastifyError,
  req: FastifyRequest,
  res: FastifyReply,
) => {
  let error: IError = {
    statusCode: 500,
    error: 'Internal server Error',
    message: err?.message,
  };

  console.log(err);

  if (err instanceof EmailAlreadyExistentError) {
    error = {
      statusCode: 400,
      error: err.name,
      message: 'Email already existent',
    };
  }


  if (err instanceof ValidationError) {
    error = {
      statusCode: 422,
      error: err.name,
      message: 'Could not Process request',
    };
  }

  if (err instanceof NotFoundError) {


    error = {
      statusCode: 404,
      error: err.name,
      message: 'Item not found',
    };
  }

  if (err instanceof InvalidUUIDError) {
    error = {
      error: err.name,
      message: err.message,
      statusCode: 422,
    };
  }

  res.status(error.statusCode).send(error);
};
