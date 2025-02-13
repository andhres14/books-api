import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Author } from "@/database/entities/Author";
import { IsUnique } from "../validators/IsUniqueValidator";

export class CreateAuthorDTO {
  id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsUnique(Author, "email")
  email: string;
}

export class UpdateAuthorDTO {
  id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsUnique(Author, "email")
  email: string;
}