import { useRef } from "react";
import { io, Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../@types/socketTypes";

interface JoinProps {
  setSocket: React.Dispatch<
    React.SetStateAction<Socket<
      ServerToClientEvents,
      ClientToServerEvents
    > | null>
  >;
}

export const Join = ({ setSocket }: JoinProps) => {
  const userNameRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = () => {
    if (userNameRef.current) {
      const userName = userNameRef.current.value;
      console.log(userName);

      const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
        "http://localhost:3000",
      );

      newSocket.on("connect", () => {
        console.log("Requisição para entrar no chat...");
        newSocket.emit("set_username", userName);
      });

      setSocket(newSocket);
    }
  };

  return (
    <div>
      <h3>Join!</h3>
      <input type="text" ref={userNameRef} placeholder="Nome de usuário" />
      <button onClick={handleSubmit}>Entrar</button>
    </div>
  );
};
