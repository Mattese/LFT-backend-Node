import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

/**
 * Common API responses that can be reused across controllers
 */
export const ApiCommonResponses = () =>
  applyDecorators(
    ApiResponse({
      status: 400,
      description: 'Bad request - validation failed',
    }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );

export const ApiNotFoundResponse = () =>
  applyDecorators(
    ApiResponse({ status: 404, description: 'Resource not found' }),
  );

export const ApiUnauthorizedResponse = () =>
  applyDecorators(ApiResponse({ status: 401, description: 'Unauthorized' }));

export const ApiCreatedResponse = (description: string) =>
  applyDecorators(ApiResponse({ status: 201, description }));

export const ApiOkResponse = (description: string) =>
  applyDecorators(ApiResponse({ status: 200, description }));

export const ApiNoContentResponse = (description: string) =>
  applyDecorators(ApiResponse({ status: 204, description }));
