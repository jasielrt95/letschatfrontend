let socket;

const connect = (url, onMessage, onOpen, onClose, onError) => {
  socket = new WebSocket(url);

  socket.addEventListener("open", (event) => {
    if (typeof onOpen === "function") {
      onOpen(event);
    }
  });

  socket.addEventListener("message", (event) => {
    if (typeof onMessage === "function") {
      onMessage(event);
    }
  });

  socket.addEventListener("error", (event) => {
    if (typeof onError === "function") {
      onError(event);
    }
  });

  socket.addEventListener("close", (event) => {
    if (typeof onClose === "function") {
      onClose(event);
    }
  });
};

const sendMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(message);
  }
};

const disconnect = () => {
  if (socket) {
    socket.close();
  }
};

export { connect, sendMessage, disconnect };
