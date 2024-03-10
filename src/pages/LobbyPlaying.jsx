import { useLobbies } from "../context/LobbiesContext";
import Button from "../components/Button";
import Notifications from "../components/Notifications";
import { answerQuestion, endSession, nextRound } from "../utils/api";
import { usePlayers } from "../context/PlayersContext";
import { useEffect, useState } from "react";
import { useWebSocket } from "../context/WebSocketContext";
import AnswersList from "../components/Answers";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import Timer from "../components/Timer";

const LobbyPlaying = () => {
  const navigate = useNavigate();
  const {
    lobbyData,
    question,
    answer,
    setAnswer,
    answers,
    setAnswers,
    hasSubmitted,
    setHasSubmitted,
    clearState: clearLobbiesState,
  } = useLobbies();

  // Timeout
  const Timeout = import.meta.env.VITE_ANSWER_TIMEOUT;

  const { playerData, clearState: clearPlayerState } = usePlayers();
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    setStartTime(Date.now());
  }, [question]);

  const {
    registerMessageHandler,
    unregisterMessageHandler,
    clearState: clearWebsockets,
  } = useWebSocket();

  const [showToast, setShowToast] = useState(false);

  const handleShowAnswers = (message) => {
    setAnswers(message.data.answers);
  };

  const handleEndSession = () => {
    endSession(lobbyData.id, lobbyData.security_token);
  };

  const clearState = () => {
    setShowToast(true);
    setTimeout(() => {
      clearLobbiesState();
      clearPlayerState();
      clearWebsockets();
      navigate("/");
      setShowToast(false);
    }, 5000);
  };

  useEffect(() => {
    registerMessageHandler("all answers received", handleShowAnswers);
    registerMessageHandler("game finished", clearState);
    return () => {
      unregisterMessageHandler("all answers received");
      unregisterMessageHandler("game finished");
    };
  }, [setAnswers, registerMessageHandler, unregisterMessageHandler]);

  const handleAnswerSubmission = () => {
    answerQuestion(
      lobbyData.id,
      lobbyData.security_token,
      question.id,
      answer,
      playerData.id
    )
      .then(() => {
        setAnswer("");
        setHasSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNextQuestion = async () => {
    nextRound(lobbyData.id, lobbyData.security_token);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (question && lobbyData.id && lobbyData.security_token) {
        console.log(hasSubmitted);
        if (!hasSubmitted) {
          handleAnswerSubmission();
        }
      }
    }, Timeout);

    return () => clearTimeout(timer);
  }, [question, lobbyData.id, lobbyData.security_token, hasSubmitted]);

  if (!question) {
    return null;
  }

  return (
    <div className="grid place-items-center h-full w-full px-4 py-8">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6">
        <Toast
          message="Thanks for playing! Share with your friends!"
          isVisible={showToast}
        />
        <div className="flex flex-col items-center justify-center mb-6">
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            {question.question}
          </h1>
          {!hasSubmitted && <Timer start={startTime} />}
        </div>

        {!hasSubmitted ? (
          <>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out mb-4"
              placeholder="Your answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <div className="flex justify-center mb-6">
              <Button
                onClick={handleAnswerSubmission}
                className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-opacity-50"
              >
                Answer
              </Button>
            </div>
          </>
        ) : (
          answers.length === 0 && (
            <p className="text-center text-gray-600 mb-6">
              Waiting for other players...
            </p>
          )
        )}

        <Notifications className="mb-6" />
        {answers && answers.length > 0 && (
          <>
            <AnswersList answers={answers} />
            <div className="flex justify-center space-x-4 mt-6">
              <Button onClick={handleEndSession}>End Session</Button>
              <Button onClick={handleNextQuestion}>Next Question</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LobbyPlaying;
