import { useState, useEffect } from "react";
import Button from "../components/Button";
import { createLobby, createPlayer, joinLobby } from "../utils/api";
import { useLobbies } from "../context/LobbiesContext";
import { usePlayers } from "../context/PlayersContext";
import { useNavigate, useParams } from "react-router-dom";
import { useWebSocket } from "../context/WebSocketContext";

const Home = () => {
  const { registerMessageHandler } = useWebSocket();
  const [username, setUsername] = useState("");
  const { setLobbyData, setQuestion, setAnswers, setHasSubmitted, setAnswer } =
    useLobbies();
  const { setPlayerData } = usePlayers();

  useEffect(() => {
    const handleNewQuestion = (message) => {
      setQuestion({
        question: message.data.question,
        id: message.data.id,
      });
      setAnswers([]);
      setHasSubmitted(false);
      setAnswer("");
    };

    registerMessageHandler("new question", handleNewQuestion);
  }, []);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await createPlayer(username);
      setPlayerData(response);

      if (response && response.id) {
        let lobbyData = null;

        if (id) {
          lobbyData = await joinLobby(response.id, id);
        } else {
          lobbyData = await createLobby(
            username + " lobby",
            import.meta.env.VITE_NUMBER_OF_PLAYERS
          );
          await joinLobby(response.id, lobbyData.id);
        }

        setLobbyData(lobbyData);
        navigate("/lobby");
      } else {
        console.error("Player creation failed", response);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  return (
    <div className="grid place-items-center h-full w-full p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 text-center">
        {" "}
        <h1 className="text-2xl font-bold mb-4">Welcome to Lets Chat</h1>
        <div className="flex flex-col items-center space-y-4">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            className="border-2 rounded-md border-blue-700 p-2 text-center"
            onChange={handleUsernameChange}
          />
          <Button onClick={handleSubmit}>Play Game</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
