import { Test, TestingModule } from '@nestjs/testing';
import { CriticalController } from './critical.controller';
import { CriticalService } from './critical.service';

describe('CriticalController', () => {
  let controller: CriticalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CriticalController],
      providers: [CriticalService],
    }).compile();

    controller = module.get<CriticalController>(CriticalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
