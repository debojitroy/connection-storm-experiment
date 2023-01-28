import { Test, TestingModule } from '@nestjs/testing';
import { BadController } from './bad.controller';
import { BadService } from './bad.service';

describe('BadController', () => {
  let controller: BadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BadController],
      providers: [BadService],
    }).compile();

    controller = module.get<BadController>(BadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
