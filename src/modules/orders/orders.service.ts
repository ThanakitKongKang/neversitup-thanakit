import { Injectable, Inject } from '@nestjs/common';

import { Order } from './order.entity';
import { OrderDto } from './dto/order.dto';
import { ORDER_REPOSITORY } from '../../core/constants';
import { Product } from '../products/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
  ) {}

  async create(order: OrderDto, userId): Promise<Order> {
    return await this.orderRepository.create<Order>({
      productId: order.productId,
      amount: order.amount,
      userId,
    });
  }

  async cancel(id, userId) {
    const [affectedCount, affectedRows] = await this.orderRepository.update(
      { status: 'CANCELED' },
      { where: { id, userId, status: 'SUCCEED' }, returning: true },
    );

    return { affectedCount, affectedRows };
  }

  async findOne(id): Promise<Order> {
    // where status not canceled
    return await this.orderRepository.findOne<Order>({
      where: { id, status: 'SUCCEED' },
      include: [Product],
    });
  }
}
