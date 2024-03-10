import { createContext, useContext, useState, useMemo } from "react";

const PlayersContext = createContext();

const PlayersProvider = ({ children }) => {
  const [playerData, setPlayerData] = useState([]);

  const clearState = () => {
    setPlayerData([]);
  };

  const value = useMemo(
    () => ({
      playerData,
      setPlayerData,
      clearState,
    }),
    [playerData]
  );
  return (
    <PlayersContext.Provider value={value}>{children}</PlayersContext.Provider>
  );
};

export const usePlayers = () => {
  const context = useContext(PlayersContext);
  if (context === undefined) {
    throw new Error("usePlayers must be used within a PlayersProvider");
  }
  return context;
};

export { PlayersContext, PlayersProvider };
