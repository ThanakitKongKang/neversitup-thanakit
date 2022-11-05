import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Table
export class Order extends Model<Order> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.ENUM,
    values: ['SUCCEED', 'CANCELED'],
    allowNull: false,
    defaultValue: 'SUCCEED',
  })
  status: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Product)
  product: Product;
}
