import { io } from 'socket.io-client';

export function executeAction(action: string, conversationId?: string, message?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const query = {
      latest_event_id: -1,
      conversation_id: conversationId || process.env.CONVERSATION_ID || 'default'
    };
    const baseUrl = process.env.BACKEND_BASE_URL || 'http://localhost:3000';
    const socket = io(baseUrl, { transports: ['websocket'], query });
    let collectedEvents: any[] = [];
    let status = 'DISCONNECTED';

    socket.on('connect', () => {
      status = 'CONNECTED';
      if (action === 'send' && message) {
        socket.emit('oh_action', message);
      }
      setTimeout(() => {
        socket.disconnect();
        resolve({ status, events: collectedEvents });
      }, 2000);
    });

    socket.on('oh_event', (event: any) => {
      collectedEvents.push(event);
    });

    socket.on('disconnect', () => {
      status = 'DISCONNECTED';
    });

    socket.on('connect_error', (error: any) => {
      socket.disconnect();
      reject({ error: error.message || error });
    });
  });
}
