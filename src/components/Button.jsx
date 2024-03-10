import React from "react";

const Button = ({ children, onClick, className, ...props }) => {
  const baseStyle =
    "bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded";

  const buttonStyle = `${baseStyle} ${className}`;

  return (
    <button onClick={onClick} className={buttonStyle} {...props}>
      {children}
    </button>
  );
};

export default Button;
