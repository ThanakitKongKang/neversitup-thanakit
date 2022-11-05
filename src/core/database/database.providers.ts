import { Sequelize } from 'sequelize-typescript';

import { SEQUELIZE, DEVELOPMENT } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/user.entity';
import { Product } from '../../modules/products/product.entity';
import { Order } from '../../modules/orders/order.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Product, Order]);
      await sequelize.sync({ force: true }).then(() => {
        console.log('Drop and Resync Db');
        initial();
      });

      return sequelize;
    },
  },
];

const initial = async () => {
  await Product.bulkCreate([
    { name: 'Product 1', price: 100 },
    { name: 'Product 2', price: 200 },
    { name: 'Product 3', price: 300 },
  ]);

  // await User.bulkCreate([
  //   {
  //     name: 'user1',
  //     email: 'user1@test.com',
  //     password: '123456',
  //     gender: 'male',
  //   },
  //   {
  //     name: 'user2',
  //     email: 'user2@test.com',
  //     password: '123456',
  //     gender: 'female',
  //   },
  // ]);

  // await Order.bulkCreate([
  //   { amount: 100, userId: 1, productId: 1 },
  //   { amount: 200, userId: 2, productId: 2 },
  // ]);
};
