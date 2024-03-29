'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { JWT, socket_url } from '@/lib/variables';
import {
  I_LiveMessageRequest,
  I_Message,
  T_JoinLiveResponse,
  T_LiveMessageResponse,
  T_VideoCallInviteResponse,
} from '@/lib/types';
import { toast } from 'react-toastify';
import VideoChatInvitation, {
  toast_config,
} from '@/components/toast/VideoChatInvitation';
import Cookie from 'js-cookie';
import { blob_to_json } from '@/lib/utilities';

import mitt, { Emitter } from 'mitt';
import { socket_events } from '@/lib/types/enumerations';

type MittEvents = {
  [socket_events.MESSAGE]: I_Message;
  [socket_events.JOIN_LIVE]: T_JoinLiveResponse;
  [socket_events.LIVE_MESSAGE]: T_LiveMessageResponse;
  [socket_events.VIDEO_CALL_INVITE]: T_VideoCallInviteResponse;
};

type WebSocketContextType = {
  webSocket: WebSocket | null;
  emitter: Emitter<MittEvents> | null;
  connectWebSocket: () => void;
};

const WebSocketContext = createContext<WebSocketContextType>({
  webSocket: null,
  emitter: null,
  connectWebSocket: () => {},
});

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [emitter, setEmitter] = useState<Emitter<MittEvents> | null>(null);

  const connectWebSocket = () => {
    if (!Cookie.get(JWT.token_name)) return;

    const ws = new WebSocket(socket_url);
    const emitter = mitt<MittEvents>();

    ws.onopen = () => console.log('Connected to socket');
    ws.onclose = (event: CloseEvent) => {
      console.error('WebSocket Disconnected', event.reason);
      // @ts-ignore
      emitter?.off('*');
      ws.close();
      setTimeout(connectWebSocket, 2000);
    };

    ws.onerror = (error: Event) => {
      console.error('WebSocket Error:', error);
      // @ts-ignore
      emitter?.off('*');
      ws.close();
      setTimeout(connectWebSocket, 2000);
    };

    ws.onmessage = (event: MessageEvent) =>
      blob_to_json<
        | I_Message
        | T_VideoCallInviteResponse
        | T_LiveMessageResponse
        | T_JoinLiveResponse
      >(event.data, (data) => {
        if (!data) return console.log('Fail :///');
        console.log(`Emitting event ${data.type}`);

        switch (data.type) {
          case socket_events.MESSAGE:
            emitter.emit(socket_events.MESSAGE, data as I_Message);
            break;
          case socket_events.JOIN_LIVE:
            emitter.emit(socket_events.JOIN_LIVE, data as T_JoinLiveResponse);
            break;
          case socket_events.LIVE_MESSAGE:
            emitter.emit(
              socket_events.LIVE_MESSAGE,
              data as T_LiveMessageResponse,
            );
            break;
          case socket_events.VIDEO_CALL_INVITE:
            useCallNotification(data as T_VideoCallInviteResponse);
            emitter.emit(
              socket_events.VIDEO_CALL_INVITE,
              data as T_VideoCallInviteResponse,
            );
            break;
          default:
            console.error('Response type from socket not implemented', data);
        }
      });

    setWebSocket(ws);
    setEmitter(emitter);
  };

  useEffect(() => {
    connectWebSocket();
    return () => {
      webSocket?.close();
      // @ts-ignore
      emitter?.off('*');
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ webSocket, emitter, connectWebSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export function useCallNotification(callData: T_VideoCallInviteResponse) {
  toast((t) => <VideoChatInvitation {...t} data={callData} />, toast_config);
}

export function wsJoinLive({
  ws,
  liveId,
}: {
  ws?: WebSocket | null;
  liveId?: string | null;
}) {
  if (!ws || !ws.readyState) return console.error('Websocket not found');
  if (!liveId) return console.error('No liveId');

  ws.send(
    JSON.stringify({
      type: socket_events.JOIN_LIVE,
      liveId,
    }),
  );
}

export function wsSendLiveMessage({
  ws,
  liveId,
  sender,
  content,
}: {
  ws?: WebSocket | null;
  liveId?: string | null;
  sender?: string | null;
  content?: string | null;
}) {
  if (!ws) return console.error('Websocket not found');
  if (!liveId) return console.error('No liveId');
  if (!sender) return console.error('No sender');
  if (!content || !content.length) return console.error('No content');

  const request: I_LiveMessageRequest = {
    type: socket_events.LIVE_MESSAGE,
    content,
    sender,
    liveId,
  };

  ws.send(JSON.stringify(request));
}

export function wsSendMessage({
  ws,
  sender,
  recipient,
  content = '',
  date,
  images,
}: {
  content: string;
  images: string[];
  ws?: WebSocket | null;
  sender?: string | null;
  recipient?: string | null;
  date?: Date;
}) {
  if (!ws) return console.error('Websocket not found');
  if (!sender) return console.error('No Sender');
  if (!recipient) return console.error('No Recipient');

  ws.send(
    JSON.stringify({
      type: socket_events.MESSAGE,
      sender,
      recipient,
      content,
      date: date ? date.toISOString() : new Date().toISOString(),
      images,
    }),
  );
}
