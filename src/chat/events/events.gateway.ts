import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Message } from '../message/model/message.model';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'chat',
})
export class EventGateWay {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string) {
    return message;
  }
  sendNewMessage(message: Message) {
    this.server.emit('message', message);
    return message;
  }
}
