import React from "react";
import Card from "./Card";

const AnswersList = ({ answers }) => {
  const playerDidNotAnswerMessage = import.meta.env.VITE_PLAYER_DID_NOT_ANSWER;

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
        Answers
      </h2>
      <div className="space-y-4">
        {answers.map((answer, index) => (
          <Card
            key={index}
            title={`${answer.player}`}
            body={
              answer.text === ""
                ? playerDidNotAnswerMessage
                : `${answer.text}`
            }
            color={answer.text === "" ? "red" : "blue"}
            className={
              "bg-slate-200" + (answer.text === "" ? " text-red-500" : "")
            }
            isAnswer={true}
          />
        ))}
      </div>
    </div>
  );
};

export default AnswersList;
