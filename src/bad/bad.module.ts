import { Module } from '@nestjs/common';
import { BadService } from './bad.service';
import { BadController } from './bad.controller';

@Module({
  controllers: [BadController],
  providers: [BadService],
})
export class BadModule {}
