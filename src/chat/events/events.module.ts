import { Module } from '@nestjs/common';
import { EventGateWay } from './events.gateway';

@Module({
  exports: [EventGateWay],
  providers: [EventGateWay],
})
export class EventsModule {}
