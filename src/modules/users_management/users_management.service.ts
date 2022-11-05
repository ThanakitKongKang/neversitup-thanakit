import { Injectable, Inject } from '@nestjs/common';

import { User } from '../users/user.entity';
import { Order } from '../orders/order.entity';
import { Product } from '../products/product.entity';

import { UserDto } from '../users/dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';

@Injectable()
export class UsersManagementServices {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: { id },
      attributes: { exclude: ['password'] },
    });
  }

  async getOrderHistory(id: number): Promise<Order[]> {
    return await Order.findAll<Order>({
      where: { userId: id },
      include: [Product],
    });
  }
}
