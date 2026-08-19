import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { JwtPayload } from "./auth.types";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.headers.authorization;
    const token = authorization?.startsWith("Bearer ")
      ? authorization.slice(7)
      : undefined;
    if (!token) throw new UnauthorizedException("Missing Bearer access token");

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      const headerUserId = request.headers.user_id;
      if (
        headerUserId !== undefined &&
        Number(Array.isArray(headerUserId) ? headerUserId[0] : headerUserId) !==
          payload.id
      ) {
        throw new UnauthorizedException(
          "user_id header must match the JWT subject",
        );
      }
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException("Invalid or expired access token");
    }
  }
}
