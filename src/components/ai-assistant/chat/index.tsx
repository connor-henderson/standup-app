import OpenAI from 'openai';
import React, { useEffect, useState } from 'react';

const Chat = ({ assistantChoice }: { assistantChoice: string }) => {
  const [inputValue, setInputValue] = useState('');
  const [streamedResponse, setStreamedResponse] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  const sendMessage = async () => {
    // Send the user's message to the server
    try {
      setLoading(true); // Set loading to true when sending message
      let prompt = inputValue.trim();
      if (assistantChoice === 'Associations') {
        const prefix =
          'Respond with about 30 word / phrase associations for the following phrase, separated by a `\n` character';
        prompt = prefix + prompt;
      }
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setStreamedResponse(data.message);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false); // Set loading back to false after response
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!inputValue) return;
    sendMessage();
  };

  // Loading circle component
  const LoadingCircle = () => <div className="loading-circle">Loading... </div>;

  return (
    <div>
      <textarea
        style={{ color: 'black', height: '10vh' }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={onSubmit}>➡️</button>
      {loading ? (
        <LoadingCircle />
      ) : (
        <div style={{ color: 'blue' }}>{streamedResponse}</div>
      )}
    </div>
  );
};

export default Chat;
