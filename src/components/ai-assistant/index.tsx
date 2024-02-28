import React, { useState } from 'react';
import Chat from './chat';

const AIAssistant = () => {
  const options = ['Chat', 'Associations', 'Examples'];
  const [assistantChoice, setAssistantChoice] = useState<string | null>(
    options[0]
  );

  return (
    <div className="m-5 p-2 border border-gray-400 rounded-lg max-w-lg">
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
      <Chat assistantChoice={assistantChoice} />
    </div>
  );
};

export default AIAssistant;
