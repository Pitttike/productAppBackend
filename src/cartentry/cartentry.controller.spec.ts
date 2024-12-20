import { Test, TestingModule } from '@nestjs/testing';
import { CartentryController } from './cartentry.controller';
import { CartentryService } from './cartentry.service';

describe('CartentryController', () => {
  let controller: CartentryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartentryController],
      providers: [CartentryService],
    }).compile();

    controller = module.get<CartentryController>(CartentryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
