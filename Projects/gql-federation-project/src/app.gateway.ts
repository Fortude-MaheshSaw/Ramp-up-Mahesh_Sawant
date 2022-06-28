/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  @WebSocketServer()
  server: Server;


  fileUpload(data: any) {
    this.server.emit('jobStatus', data);
  }

  confirmRemoval(msg: any) {
    this.server.emit('confirmationDone', msg);
  }

}
