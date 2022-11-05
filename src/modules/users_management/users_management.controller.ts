import {
  Controller,
  Get,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersManagementServices } from './users_management.service';
import { User as UserEntity } from '../users/User.entity';
import { Order as OrderEntity } from '../orders/Order.entity';

@Controller('users')
export class UsersManagementController {
  constructor(
    private readonly userManagementService: UsersManagementServices,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async findOne(@Request() req): Promise<UserEntity> {
    // find the User with this id
    const User = await this.userManagementService.findOneById(req.user.id);
    // if the User doesn't exit in the db, throw a 404 error
    if (!User) {
      throw new NotFoundException("This User doesn't exist");
    }

    // if User exist, return the User
    return User;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('order/history')
  async getOrderHistory(@Request() req): Promise<OrderEntity[]> {
    //find order history of the User with the id
    const OrderHistory = await this.userManagementService.getOrderHistory(
      req.user.id,
    );

    return OrderHistory;
  }
}
