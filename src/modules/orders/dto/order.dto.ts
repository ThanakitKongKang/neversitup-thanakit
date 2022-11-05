import { IsNotEmpty } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  readonly productId: number;

  @IsNotEmpty()
  readonly amount: number;
}
