import { Controller } from '@nestjs/common';
import { BadService } from './bad.service';

@Controller('bad')
export class BadController {
  constructor(private readonly badService: BadService) {}
}
