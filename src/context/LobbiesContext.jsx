import { createContext, useContext, useState, useMemo } from "react";

const LobbiesContext = createContext();

const LobbiesProvider = ({ children }) => {
  const [lobbyData, setLobbyData] = useState([]);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const clearState = () => {
    setLobbyData([]);
    setQuestion(null);
    setAnswer("");
    setAnswers([]);
    setHasSubmitted(false);
  };

  const value = useMemo(
    () => ({
      lobbyData,
      setLobbyData,
      question,
      setQuestion,
      answer,
      setAnswer,
      answers,
      setAnswers,
      hasSubmitted,
      setHasSubmitted,
      clearState,
    }),
    [lobbyData, question, answer, answers, hasSubmitted]
  );

  return (
    <LobbiesContext.Provider value={value}>{children}</LobbiesContext.Provider>
  );
};

export const useLobbies = () => {
  const context = useContext(LobbiesContext);
  if (context === undefined) {
    throw new Error("useLobbies must be used within a LobbiesProvider");
  }
  return context;
};

export { LobbiesContext, LobbiesProvider };
