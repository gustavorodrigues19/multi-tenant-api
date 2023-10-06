// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'
import { Reflector } from '@nestjs/core'
import { Payload } from '../../@shared/types/payload'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) return true

    const request = context.switchToHttp().getRequest()
    const encodedToken = this.extractTokenFromHeader(request)
    if (!encodedToken) throw new UnauthorizedException()

    try {
      const token = Buffer.from(encodedToken, 'base64').toString('utf-8')
      const payload: Payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_KEY,
      })

      request['payload'] = payload
    } catch {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN)
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
