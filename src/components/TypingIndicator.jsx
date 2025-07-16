import React from 'react';
import './TypingIndicator.css';

const TypingIndicator = ({ gifUrl }) => (
  <div className="typing-indicator-container">
    <img src={gifUrl} alt="Digitando..." className="typing-gif" />
  </div>
);

export default TypingIndicator;