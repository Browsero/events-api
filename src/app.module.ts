import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
import { ConfigModule } from '@nestjs/config';
import typeormConfig from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [typeormConfig] }),
    TypeOrmModule.forRootAsync({ useFactory: typeormConfig }),
    EventsModule,
  ],
})
export class AppModule {}
