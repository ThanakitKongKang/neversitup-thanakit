import { Module } from '@nestjs/common';

import { UsersManagementServices } from './users_management.service';
import { usersProviders } from './users_management.providers';
import { UsersManagementController } from './users_management.controller';

@Module({
  providers: [UsersManagementServices, ...usersProviders],
  controllers: [UsersManagementController],
})
export class UsersManagementModule {}
