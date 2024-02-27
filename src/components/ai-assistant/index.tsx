import React, { useState } from 'react';
import Chat from './chat';

const AIAssistant = () => {
  const options = ['Chat', 'Associations'];
  const [assistantChoice, setAssistantChoice] = useState<string | null>(
    options[0]
  );

  return (
    <div className="m-5 p-2 border border-gray-400 rounded-lg min-w-80">
      AI Assistant
      <div>
        {options.map((option) => (
          <div key={option} style={{ marginBottom: '10px' }}>
            <button
              onClick={() => setAssistantChoice(option)}
              style={{
                backgroundColor:
                  assistantChoice === option ? 'lightblue' : 'purple',
              }}>
              {option}
            </button>
          </div>
        ))}
      </div>
      {assistantChoice === 'Chat' && <Chat />}
    </div>
  );
};

export default AIAssistant;
