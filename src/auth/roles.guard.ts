import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './roles.enum';
import { ROLES_KEY } from './roles.decorator';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private db: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log(user);
    const userWithRoles = await this.getUserWithRoles(user.id);

    if (!userWithRoles) {
        return false;
        }
    console.log(userWithRoles.roles);

    const userRoles = userWithRoles.roles.map(role => role.name as Role);
    return requiredRoles.some((role) => userRoles.includes(role));
  }

  async getUserWithRoles(id: number) {
    return await this.db.user.findUnique({
      where: {
        id: id
      },
      select: {
        roles: {
            select: {
                name: true
            }
        }
      }
    });
  }
}
