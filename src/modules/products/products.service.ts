import { Injectable, Inject } from '@nestjs/common';

import { Product } from './product.entity';
import { PRODUCT_REPOSITORY } from '../../core/constants';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.findAll<Product>();
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findOne({
      where: { id },
    });
  }
}
