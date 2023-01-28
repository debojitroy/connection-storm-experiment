import { Controller, Get, Param } from '@nestjs/common';
import { CriticalService } from './critical.service';

@Controller('critical')
export class CriticalController {
  constructor(private readonly criticalService: CriticalService) {}

  @Get(':id')
  async findOne(@Param() params) {
    return this.criticalService.getEmployee(params.id);
  }
}
