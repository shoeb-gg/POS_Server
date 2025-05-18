import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const UserID = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.user || !('id' in request.user)) {
      throw new UnauthorizedException('User ID not found in request');
    }

    const userId = Number(request.user.id);
    if (isNaN(userId) || userId <= 0) {
      throw new UnauthorizedException('Invalid user ID');
    }

    return userId;
  },
);
