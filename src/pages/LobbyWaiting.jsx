import { useState } from "react";
import { useLobbies } from "../context/LobbiesContext";
import Button from "../components/Button";
import Notifications from "../components/Notifications";
import { startLobby } from "../utils/api";
import Toast from "../components/Toast";

const LobbyWaiting = () => {
  const { lobbyData } = useLobbies();
  const [showToast, setShowToast] = useState(false);

  const startGame = () => {
    startLobby(lobbyData.id, lobbyData.security_token);
  };

  const copyURL = (id) => {
    if (navigator.clipboard && window.isSecureContext) {
      const BASE_URL = import.meta.env.VITE_BASE_URL + "lobby/";
      navigator.clipboard.writeText(BASE_URL + id).then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      });
    } else {
      console.log("Clipboard not supported");
      console.log(BASE_URL + id);
      
      // fallback to copying manually
      const textToCopy = BASE_URL + id;
      const input = document.createElement("input");
      input.value = textToCopy;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="grid place-items-center h-full w-full">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          <span className="text-blue-700">{lobbyData.name}</span> Waiting for
          other players to join!
        </h1>
        <div className="p-4 flex flex-col justify-between space-y-2">
          <Button onClick={() => copyURL(lobbyData.id)}>Share Lobby</Button>
          <Button onClick={startGame}>Start Game</Button>
        </div>
        <Notifications />
      </div>
      <Toast message="URL Copied to Clipboard!" isVisible={showToast} />
    </div>
  );
};

export default LobbyWaiting;
