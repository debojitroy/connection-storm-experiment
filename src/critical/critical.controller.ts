import { Controller, Get } from '@nestjs/common';
import { CriticalService } from './critical.service';

@Controller('critical')
export class CriticalController {
  constructor(private readonly criticalService: CriticalService) {}

  @Get()
  async rds() {
    return this.criticalService.getValues();
  }
}
