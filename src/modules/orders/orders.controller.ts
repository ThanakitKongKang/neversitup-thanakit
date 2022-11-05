import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { OrdersService } from './orders.service';
import { Order as OrderEntity } from './order.entity';
import { OrderDto } from './dto/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() order: OrderDto, @Request() req): Promise<OrderEntity> {
    // create a new order and return the newly created order
    return await this.orderService.create(order, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async cancel(@Param('id') id: number, @Request() req) {
    // cancel the order with this id
    const { affectedRows } = await this.orderService.cancel(id, req.user.id);

    // return success message
    if (affectedRows) {
      return 'Successfully canceled';
    }

    throw new NotFoundException("This Order doesn't exist");
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<OrderEntity> {
    // find the order with this id
    const order = await this.orderService.findOne(id);

    // if the order doesn't exit in the db, throw a 404 error
    if (!order) {
      throw new NotFoundException("This Order doesn't exist or canceled");
    }

    // if order exist, return the order
    return order;
  }
}
