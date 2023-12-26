import { Module } from '@nestjs/common';
import { EventGateWay } from './events.gateway';

@Module({
  providers: [EventGateWay],
})
export class EventsModule {}
