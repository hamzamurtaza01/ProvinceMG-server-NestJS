import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class WebhookGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {}

  private logger: Logger = new Logger('WebhookGateway');

  @WebSocketServer() wss: Server;

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: string): Promise<void> {
    this.wss.emit('receiveMessage', 'newMessage');
  }
  async send(contactID: string, module: string): Promise<void> {
    this.wss.emit('webHookEvent', { contactID, module });
  }
  // reconnect socket after network live
  @SubscribeMessage('reconnect')
  async handleReconnect(client: Socket, payload: string): Promise<void> {
    this.wss.emit('reconnect', payload);
  }
}
