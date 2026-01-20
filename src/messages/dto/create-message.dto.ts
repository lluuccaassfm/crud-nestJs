import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly texto: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  readonly de: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  readonly para: string;
}
