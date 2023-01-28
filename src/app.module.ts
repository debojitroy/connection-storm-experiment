import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BadModule } from './bad/bad.module';
import { CriticalModule } from './critical/critical.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 300 * 1000,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BadModule,
    CriticalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
