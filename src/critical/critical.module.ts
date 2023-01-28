import { Module } from '@nestjs/common';
import { CriticalService } from './critical.service';
import { CriticalController } from './critical.controller';
import { SecretsModule } from '../secrets/secrets.module';

@Module({
  controllers: [CriticalController],
  providers: [CriticalService],
  imports: [SecretsModule],
})
export class CriticalModule {}
