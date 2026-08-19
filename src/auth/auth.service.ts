import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { db1 } from "../database/db";
import { Role } from "../enum/role.enum";
import { JwtPayload } from "./auth.types";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async issueDevelopmentToken(userId: number) {
    const user = await db1("users").where({ id: userId }).first();
    if (!user) throw new NotFoundException("User not found");
    const payload: JwtPayload = { id: user.id, role: user.role as Role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: payload,
    };
  }
}
