import { Test, TestingModule } from '@nestjs/testing';
import { BadService } from './bad.service';

describe('BadService', () => {
  let service: BadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BadService],
    }).compile();

    service = module.get<BadService>(BadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
