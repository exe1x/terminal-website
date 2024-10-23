import React, { useState } from 'react';
import './Terminal.css';
import axios from 'axios'; // Import Axios to make API requests
const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { sender: 'FudderAI', message: "What the fuck do you want? I'm tired of seeing these bullshit AIs run." }
  ]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (input.trim() !== '') {
      // Add user message to the history
      setHistory(prevHistory => [
        ...prevHistory,
        { sender: 'You', message: input }
      ]);

      try {
        // Send the user message to the backend (Heroku URL)
        const response = await axios.post('https://frozen-wave-57486-08ae7d2b8b49.herokuapp.com/api/chat', {
          message: input
        });

        // Add Sydney's response to the history
        setHistory(prevHistory => [
          ...prevHistory,
          { sender: 'sydney', message: response.data.response }
        ]);
      } catch (error) {
        console.error('Error communicating with the backend:', error);
        setHistory(prevHistory => [
          ...prevHistory,
          { sender: 'sydney', message: "Sorry, I couldn't connect to the server." }
        ]);
      }

      // Clear the input field
      setInput('');
    }
  };

  return (
    <div className="main-container">
      {/* Header with ASCII art and links */}
      <div className="header">
        <pre>
        {` _                      _             _           __    __           _ 
| |_ ___ _ __ _ __ ___ (_)_ __   __ _| |    ___  / _|  / _|_   _  __| |
| __/ _ \\ '__| '_ \` _ \\| | '_ \\ / _\` | |   / _ \\| |_  | |_| | | |/ _\` |
| ||  __/ |  | | | | | | | | | | (_| | |  | (_) |  _| |  _| |_| | (_| |
 \\__\\___|_|  |_| |_| |_|_|_| |_|\\__,_|_|___\\___/|_|___|_|  \\__,_|\\__,_|
                                      |_____|    |_____|               
`}
        </pre>
        <div className="links">
          <a href="https://x.com/TerminalOfGirls" target="_blank" rel="noopener noreferrer">[twitter]</a>
          <a href="https://pump.fun" target="_blank" rel="noopener noreferrer">[pump.fun]</a>
        </div>
      </div>

      {/* Terminal and Image */}
      <div className="terminal-container">
        <div className="image-container"> 
        </div>

        <div className="terminal">
          <div className="output">
            {history.map((entry, index) => (
              <p key={index} className={entry.sender === 'You' ? 'user-message' : 'ai-message'}>
                <strong>{entry.sender} >> </strong>{entry.message}
              </p>
            ))}
          </div>

          <div className="input-area">
            <span className="prompt">> </span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <button className="send-button" onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
