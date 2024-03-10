import React, { useState } from "react";
import Toast from "./Toast";
import Button from "./Button";

const Footer = () => {
  const [showHelpToast, setShowHelpToast] = useState(false);

  const handleHelpClick = () => {
    setShowHelpToast(true);
    setTimeout(() => setShowHelpToast(false), 20000);
  };

  // Social Links
  const twitterUrl = import.meta.env.VITE_TWITTER_URL;
  const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL;
  const githubUrl = import.meta.env.VITE_GITHUB_URL;

  // Messages
  const helpMessage = import.meta.env.VITE_TOAST_MESSAGE;

  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      <div className="container mx-auto">
        <p>A showcase of my journey with websockets.</p>
        <p>Stay connected for more updates:</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href={twitterUrl} className="hover:text-blue-400">
            Twitter
          </a>

          <a href={githubUrl} className="hover:text-blue-600">
            GitHub
          </a>
          <a href={instagramUrl} className="hover:text-pink-600">
            Instagram
          </a>
        </div>
        <Button
          onClick={handleHelpClick}
          className={
            "fixed bottom-4 right-4 text-white font-bold py-2 px-4 rounded-full"
          }
        >
          ?
        </Button>

        <Toast message={helpMessage} isVisible={showHelpToast} />
      </div>
    </footer>
  );
};

export default Footer;
