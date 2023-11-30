import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermiossionsGuard implements CanActivate {
  constructor(private reflector: Reflector){
  }

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const [req] = context.getArgs()
    const userPermissions = req?.user?.permissions || [];
    const requiredPermissions = this.reflector.get('permissions', context.getHandler()) || [];
    const hasRequiredPermission = requiredPermissions.every(permission => userPermissions.includes(permission));
    if(requiredPermissions.length === 0 || hasRequiredPermission){
      return true;
    }
    throw new ForbiddenException('Insufficient Permissions');
  }
}
