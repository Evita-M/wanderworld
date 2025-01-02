import { Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export interface BaseResponse {
  success: boolean;
  message: string;
}

interface BaseError {
  message: string;
  code: string;
}

export interface ErrorResponse extends BaseResponse {
  error: BaseError;
}

// Generic error handler
export const handleError = (error: any) => {
  console.error(error.message);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handlePrismaError(error);
  }

  return new ErrorWithStatus(
    `Something went wrong: ${error.message}`,
    StatusCodes.INTERNAL_SERVER_ERROR
  );
};

// Prisma-specific error handler
export const handlePrismaError = (
  err: Prisma.PrismaClientKnownRequestError
) => {
  switch (err.code) {
    case 'P2002':
      // Duplicate key error
      return new ErrorWithStatus(
        `Duplicate field value: ${err.meta?.target}`,
        StatusCodes.BAD_REQUEST
      );
    case 'P2014':
      // Invalid ID error
      return new ErrorWithStatus(
        `Invalid ID: ${err.meta?.target}`,
        StatusCodes.BAD_REQUEST
      );
    case 'P2003':
      // Invalid input data error (foreign key constraint)
      return new ErrorWithStatus(
        `Invalid input data: ${err.meta?.target}`,
        StatusCodes.BAD_REQUEST
      );
    default:
      // Handle all other known Prisma errors
      return new ErrorWithStatus(
        `Database error: ${err.message}`,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
  }
};

class ErrorWithStatus extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const getNotFoundResponse = (modelName: string) => {
  const error: BaseError = {
    message: `${modelName} not found`,
    code: 'NOT_FOUND',
  };
  return NextResponse.json<ErrorResponse>(
    { success: false, message: `${modelName} not found`, error },
    { status: StatusCodes.NOT_FOUND }
  );
};

export const getDuplicateResponse = (
  modelName: string,
  duplicatedField: string,
  value: string
) => {
  return NextResponse.json<ErrorResponse>(
    {
      success: false,
      message: `${modelName} with this ${duplicatedField} already exists`,
      error: {
        code: `DUPLICATE_${duplicatedField.toUpperCase()}`,
        message: `${modelName} with this ${duplicatedField} (${value}) already exists`,
      },
    },
    { status: StatusCodes.BAD_REQUEST }
  );
};

export const getServerErrorResponse = (error: unknown) => {
  const handledError = handleError(error);
  const errorResponse: BaseError = {
    message: handledError.message,
    code: 'SERVER_ERROR',
  };
  return NextResponse.json<ErrorResponse>(
    {
      success: false,
      message: 'Something went wrong',
      error: errorResponse,
    },
    { status: handledError.statusCode }
  );
};

export const getRTKQueryErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined
) => {
  if (!error) return 'An error occurred';

  if ('data' in error) {
    return ((error as FetchBaseQueryError).data as { message: string })
      ?.message;
  }

  return (error as SerializedError).message;
};
