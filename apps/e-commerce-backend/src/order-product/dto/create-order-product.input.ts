import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Order } from 'src/order/entities';

export class CreateOrderProductInput {
  order: Order;

  @IsNumber()
  @IsNotEmpty()
  productVariantId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  size: string;
}
