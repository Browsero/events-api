import { IsDate, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  when: Date;

  @IsString()
  address: string;
}
