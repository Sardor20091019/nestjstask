import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("development-token")
  developmentToken(@Body() body: { user_id: number }) {
    return this.authService.issueDevelopmentToken(Number(body.user_id));
  }
}
