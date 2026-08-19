import { IsString, IsOptional } from "class-validator";

export class findbynameDTO {
  @IsString()
  @IsOptional()
  name?: string;
}
