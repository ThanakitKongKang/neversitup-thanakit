import { Test, TestingModule } from '@nestjs/testing';

import { UsersManagementController } from './users_management.controller';

describe('Products Controller', () => {
  let controller: UsersManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersManagementController],
    }).compile();

    controller = module.get<UsersManagementController>(
      UsersManagementController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
