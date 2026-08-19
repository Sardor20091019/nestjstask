import { IsString, IsOptional } from "class-validator";

export class findbytitleDTO {
  @IsString()
  @IsOptional()
  title?: string;
}
