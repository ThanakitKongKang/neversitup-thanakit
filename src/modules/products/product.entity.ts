import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Product extends Model<Product> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false,
  })
  price: number;
}
