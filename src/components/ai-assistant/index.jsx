import React, { useEffect, useState } from 'react';
import Chat from './chat/index.jsx';

const AIAssistant = ({ topic }) => {
  const options = ['Chat', 'Associations', 'Topics', 'Bits', 'Jokes'];
  const [assistantChoice, setAssistantChoice] = useState(options[0]);
  // Create the appropriate props here
  const initialChatProps = {};
  options.forEach((option) => {
    initialChatProps[option] = { inputValue: '', streamedResponse: '' };
  });
  const [chatProps, setChatProps] = useState(initialChatProps);

  return (
    <div className="m-5 p-4 bg-navy-600 shadow-lg rounded-lg max-w-lg">
      <h2 className="text-3xl font-bold text-blue-500 mb-4">AI Assistant</h2>
      <div className="options-container mb-6">
        <div className="flex justify-between">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => setAssistantChoice(option)}
              className={`px-4 py-2 text-white font-bold rounded-lg transition-colors ${
                assistantChoice === option
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-gray-700 hover:bg-gray-800'
              }`}>
              {option}
            </button>
          ))}
        </div>
      </div>
      <Chat
        assistantChoice={assistantChoice}
        chatProps={chatProps}
        setChatProps={setChatProps}
        topic={topic}
      />
    </div>
  );
};

export default AIAssistant;
