// user.dto.ts
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {

  
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;
  
  @IsNotEmpty()
  age: number;


}

