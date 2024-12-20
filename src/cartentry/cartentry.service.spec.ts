import { Test, TestingModule } from '@nestjs/testing';
import { CartentryService } from './cartentry.service';

describe('CartentryService', () => {
  let service: CartentryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartentryService],
    }).compile();

    service = module.get<CartentryService>(CartentryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
