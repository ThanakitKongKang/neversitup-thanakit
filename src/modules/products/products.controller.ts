import {
  Controller,
  Get,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { Product as ProductEntity } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    // get all products in the db
    return await this.productService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProductEntity> {
    // find the product with this id
    const product = await this.productService.findOne(id);

    // if the product doesn't exit in the db, throw a 404 error
    if (!product) {
      throw new NotFoundException("This Product doesn't exist");
    }

    // if product exist, return the product
    return product;
  }
}
