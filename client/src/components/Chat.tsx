import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../@types/socketTypes";

interface ChatProps {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

interface MessageListProps {
  message: string;
  id: string;
  username: string;
}

export const Chat = ({ socket }: ChatProps) => {
  const [messageList, setMessageList] = useState<MessageListProps[]>([]);
  const messageRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleMessageReceived = (data: MessageListProps) => {
      setMessageList((current) => [...current, data]);
    };

    socket.on("received_message", handleMessageReceived);

    return () => {
      socket.off("received_message", handleMessageReceived);
    };
  }, [socket]);

  const handleSubmit = () => {
    if (messageRef.current) {
      const message = messageRef.current.value;

      socket.emit("send_message", message);
      clearInput();
    }
  };

  const clearInput = () => {
    if (messageRef.current) {
      messageRef.current.value = "";
    }
  };

  return (
    <div>
      <h3>Chat</h3>
      {messageList.map((message, i) => {
        return (
          <p key={i}>
            {message.username}: {message.message}
          </p>
        );
      })}
      <input type="text" placeholder="Mensagem" ref={messageRef} />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
};
