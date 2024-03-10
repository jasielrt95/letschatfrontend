const Toast = ({ message, onClose, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded">
      {message}
    </div>
  );
};

export default Toast;
