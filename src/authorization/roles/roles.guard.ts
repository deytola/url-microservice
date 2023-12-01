import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector){
  }

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const [req] = context.getArgs()
    const userRoles = req?.user?.roles || [];
    const requiredRoles = this.reflector.get('roles', context.getHandler()) || [];
    const hasRequiredRole = requiredRoles.every(role => userRoles.some((item) => item.name === role));
    if(hasRequiredRole.length === 0 || hasRequiredRole){
      return true;
    }
    throw new ForbiddenException('Insufficient Roles');
  }
}
