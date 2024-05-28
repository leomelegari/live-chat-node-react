// socketTypes.ts
export interface ServerToClientEvents {
  received_message: (data: {
    id: string;
    username: string;
    message: string;
  }) => void;
}

export interface ClientToServerEvents {
  set_username: (username: string) => void;
  send_message: (message: string) => void;
}
