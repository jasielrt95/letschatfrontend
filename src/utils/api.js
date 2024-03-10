const BASE_ENDPOINT = import.meta.env.VITE_API_URL;

// Create Player Endpoint
export const createPlayer = async (username) => {
  const API_URL = BASE_ENDPOINT + "players/";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      name: username,
    }),
    headers,
  });
  const data = await response.json();
  return data;
};

export const createLobby = async (name, maxPlayers) => {
  const API_URL = BASE_ENDPOINT + "lobbies/";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      max_players: maxPlayers,
    }),
    headers,
  });
  const data = await response.json();
  return data;
};

export const joinLobby = async (playerId, lobbyId) => {
  const API_URL = BASE_ENDPOINT + "players/" + playerId + "/join/";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      lobby_id: lobbyId,
    }),
    headers,
  });
  const data = await response.json();
  return data;
};

export const startLobby = async (lobbyId, securityToken) => {
  const API_URL = BASE_ENDPOINT + "lobbies/" + lobbyId + "/start/";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      security_token: securityToken,
    }),
    headers,
  });
  const data = await response.json();
  return data;
};

export const answerQuestion = async (
  lobbyId,
  securityToken,
  questionId,
  answer,
  playerId
) => {
  const API_URL =
    BASE_ENDPOINT +
    "lobbies/" +
    lobbyId +
    "/questions/" +
    questionId +
    "/answer/";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      security_token: securityToken,
      answer: answer,
      player_id: playerId,
    }),
    headers,
  });
  const data = await response.json();
  return data;
};

export const nextRound = async (lobbyId, securityToken) => {
  const API_URL =
    BASE_ENDPOINT + "lobbies/" + lobbyId + "/questions/nextround/";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      security_token: securityToken,
    }),
    headers,
  });
  const data = await response.json();
  return data;
};

export const endSession = async (lobbyId, securityToken) => {
  const API_URL = BASE_ENDPOINT + "lobbies/" + lobbyId + "/finish/";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      security_token: securityToken,
    }),
    headers,
  });
  const data = await response.json();
  return data;
};

export const getAnswers = async (lobbyId, securityToken, questionId) => {
  const API_URL =
    BASE_ENDPOINT +
    "lobbies/" +
    lobbyId +
    "/questions/" +
    questionId +
    "/answer/";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const response = await fetch(API_URL, {
    method: "GET",
    body: JSON.stringify({
      security_token: securityToken,
    }),
    headers,
  });
  const data = await response.json();
  return data;
};
