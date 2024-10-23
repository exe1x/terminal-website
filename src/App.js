import React, { useState } from 'react';
import './Terminal.css';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = () => {
    setHistory([...history, `> ${input}`]);
    setInput('');
  };

  return (
    <div className="terminal-container">
      <div className="header">
        <h1>terminal_of_girls</h1>
        <div className="links">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">[twitter]</a>
          <a href="https://pump.fun" target="_blank" rel="noopener noreferrer">[pump.fun]</a>
        </div>
      </div>
      
      <div className="terminal">
        <div className="output">
          {history.map((item, index) => (
            <p key={index}>{item}</p>
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
  );
};

export default Terminal;
