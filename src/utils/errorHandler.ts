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
    StatusCodes.INTERNAL_SERVER_ERROR,
    ErrorCodes.SERVER_ERROR
  );
};

// Prisma-specific error handler
export const handlePrismaError = (
  err: Prisma.PrismaClientKnownRequestError
) => {
  switch (err.code) {
    case 'P2002':
      return new ErrorWithStatus(
        `Duplicate field value: ${err.meta?.target}`,
        StatusCodes.BAD_REQUEST,
        ErrorCodes.DUPLICATE_FIELD_VALUE
      );
    case 'P2014':
      return new ErrorWithStatus(
        `Invalid ID: ${err.meta?.target}`,
        StatusCodes.BAD_REQUEST,
        ErrorCodes.INVALID_ID
      );
    case 'P2023':
      return new ErrorWithStatus(
        `Error creating UUID: ${err.meta?.target}`,
        StatusCodes.BAD_REQUEST,
        ErrorCodes.ERROR_CREATING_UUID
      );
    default:
      return new ErrorWithStatus(
        `Database error: ${err.message}`,
        StatusCodes.INTERNAL_SERVER_ERROR,
        ErrorCodes.DATABASE_ERROR
      );
  }
};

export enum ErrorCodes {
  DUPLICATE_FIELD_VALUE = 'DUPLICATE_FIELD_VALUE',
  INVALID_ID = 'INVALID_ID',
  ERROR_CREATING_UUID = 'ERROR_CREATING_UUID',
  DATABASE_ERROR = 'DATABASE_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  NOT_FOUND = 'NOT_FOUND',
}

class ErrorWithStatus extends Error {
  public statusCode: number;

  public code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

export const getNotFoundResponse = (modelName: string) => {
  const error: BaseError = {
    message: `${modelName} not found`,
    code: ErrorCodes.NOT_FOUND,
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
        code: ErrorCodes.DUPLICATE_FIELD_VALUE,
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
    code: handledError.code,
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

export type RTKQueryError = FetchBaseQueryError | SerializedError | undefined;

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export function isSerializedError(
  error: unknown
): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  );
}

export const handleRTKQueryError = (error: unknown): never => {
  if (isFetchBaseQueryError(error)) {
    const errMsg =
      typeof error.data === 'object' && error.data !== null
        ? (error.data as any).message
        : String(error.data);

    throw new Error(errMsg);
  }

  if (isSerializedError(error)) {
    console.log(error);
    const errMsg = error.message;
    throw new Error(errMsg);
  }

  throw new Error('An unexpected error occurred');
};
