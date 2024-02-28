import OpenAI from 'openai';
import React, { useEffect, useState } from 'react';

const Chat = ({ assistantChoice }: { assistantChoice: string }) => {
  const [inputValue, setInputValue] = useState('');
  const [streamedResponse, setStreamedResponse] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const [selectedJokeTypes, setSelectedJokeTypes] = useState({
    sarcasm: false,
    'saying it without saying it': false,
  }); // Added state for selected joke types
  const [numExamples, setNumExamples] = useState(1); // Added state for numExamples
  const jokeTypes = ['sarcasm', 'saying it without saying it'];

  const sendMessage = async () => {
    // Send the user's message to the server
    try {
      setLoading(true); // Set loading to true when sending message
      let prompt = inputValue.trim();
      let prefix = '';
      if (assistantChoice === 'Associations') {
        prefix =
          'Respond with about 30 word / phrase associations for the following phrase, separated by a `\n` character';
      } else if (assistantChoice === 'Examples') {
        const selectedJokes = jokeTypes
          .filter((type) => selectedJokeTypes[type])
          .join(', ');
        prefix = `Respond with ${numExamples} for each of the following types of jokes and Label them with a header: ${selectedJokes}. Use this as subject matter context for the jokes: `;
      }
      prompt = prefix + prompt;
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
      {assistantChoice === 'Examples' && (
        <div>
          <label>
            Number of Examples:
            <select
              value={numExamples}
              onChange={(e) => setNumExamples(parseInt(e.target.value))}>
              {[...Array(10)].map((num, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </label>
          {jokeTypes.map((type) => (
            <label key={type}>
              <input
                type="checkbox"
                checked={selectedJokeTypes[type]}
                onChange={() =>
                  setSelectedJokeTypes({
                    ...selectedJokeTypes,
                    [type]: !selectedJokeTypes[type],
                  })
                }
              />
              {type}
            </label>
          ))}
        </div>
      )}
      {loading ? (
        <LoadingCircle />
      ) : (
        <div style={{ color: 'blue' }}>{streamedResponse}</div>
      )}
    </div>
  );
};

export default Chat;
