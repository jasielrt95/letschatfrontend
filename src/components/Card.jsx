import React from "react";

const Card = ({ title, body, isAnswer }) => {
  const baseStyle =
    "relative max-w-md m-4 mx-auto bg-white rounded-xl shadow-lg md:max-w-2xl transition-opacity duration-1000 opacity-100";

  const answerStyle =
    "relative max-w-md m-4 mx-auto bg-slate-200 rounded-xl shadow-lg md:max-w-2xl transition-opacity duration-1000 opacity-100";

  const cardStyle = isAnswer ? answerStyle : baseStyle;

  return (
    <div className={cardStyle}>
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm font-semibold text-blue-700">
          {title}
        </div>
        <p className="mt-2 text-slate-700">{body}</p>
      </div>
    </div>
  );
};

export default Card;
