import { useState } from "react";
import { Chat } from "./components/Chat";
import { Join } from "./components/Join";
import { Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "./@types/socketTypes";

function App() {
  const [socket, setSocket] = useState<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  return (
    <div>
      {!socket ? <Join setSocket={setSocket} /> : <Chat socket={socket} />}
    </div>
  );
}

export default App;
