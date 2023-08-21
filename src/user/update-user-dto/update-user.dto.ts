import { PartialType } from "@nestjs/mapped-types";
// user.dto.ts
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {

  
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;
  
  @IsNotEmpty()
  age: number;


}

