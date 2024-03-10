import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LobbyWaiting from "./pages/LobbyWaiting";
import LobbyPlaying from "./pages/LobbyPlaying";
import Footer from "./components/Footer"; // Ensure this path is correct

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-100">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lobby/playing" element={<LobbyPlaying />} />
            <Route path="/lobby/:id" element={<Home />} />
            <Route path="/lobby" element={<LobbyWaiting />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
