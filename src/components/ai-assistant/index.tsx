import React, { useState } from 'react';
import Chat from './chat';

const AIAssistant = () => {
  const options = ['Chat', 'Associations', 'Topics', 'Bits', 'Jokes'];
  const [assistantChoice, setAssistantChoice] = useState<string | null>(
    options[0]
  );

  return (
    <div className="m-5 p-2 border border-gray-400 rounded-lg max-w-lg">
      AI Assistant
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '10px 0',
          }}>
          {options.map((option) => (
            <button
              key={option}
              onClick={() => setAssistantChoice(option)}
              style={{
                backgroundColor:
                  assistantChoice === option ? 'lightblue' : 'purple',
                margin: '0 5px',
              }}>
              {option}
            </button>
          ))}
        </div>
      </div>
      <Chat assistantChoice={assistantChoice} />
    </div>
  );
};

export default AIAssistant;
