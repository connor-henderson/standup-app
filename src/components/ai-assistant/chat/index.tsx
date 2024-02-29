import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const Chat = ({
  assistantChoice,
  chatProps,
  setChatProps,
}: {
  assistantChoice: string;
  chatProps: any;
  setChatProps: any;
}) => {
  const { inputValue, streamedResponse } = chatProps[assistantChoice]; // Key into chatProps based on assistantChoice

  const [loading, setLoading] = useState(false); // Added loading state
  const [selectedJokeTypes, setSelectedJokeTypes] = useState({
    sarcasm: false,
    'saying it without saying it': false,
    Exaggeration: false,
    Understatement: false,
    Misdirection: false,
    'Illogical conclusions': false,
    Substitution: false,
    Comparison: false,
    'Unspoken conclusion': false,
    'Jumping to conclusions': false,
    'Taking things too literally': false,
    'Recognition Laughs': false,
    'Personification / Act–outs': false,
  }); // Added state for selected joke types
  const [numExamples, setNumExamples] = useState(1); // Added state for numExamples
  const jokeTypes = [
    'sarcasm',
    'saying it without saying it',
    'Exaggeration',
    'Understatement',
    'Misdirection',
    'Illogical conclusions',
    'Substitution',
    'Comparison',
    'Unspoken conclusion',
    'Jumping to conclusions',
    'Taking things too literally',
    'Recognition Laughs',
    'Personification / Act–outs',
  ];

  const exampleBitQuestions = [
    'What is it like',
    'Who instead?',
    'Why? Why not?.',
    'What’ s involved ?',
    'Where / Where else?',
    'How instead?',
    'If that’ s true, why not this?',
    'Who is involved in this ? Who else is there?',
    'Who is affected by this ?',
    'Who is oppositely affected by this ?',
    'Who needs this.?',
  ];

  const getPrompt = () => {
    let prompt = inputValue.trim();
    let prefix = '';
    if (assistantChoice === 'Associations') {
      prefix =
        'Respond with about 30 word / phrase associations for the following phrase, separated by a `\n` character';
    } else if (assistantChoice === 'Jokes') {
      const selectedJokes = jokeTypes
        .filter((type) => selectedJokeTypes[type])
        .join(', ');
      prefix = `Respond with ${numExamples} for each of the following types of jokes and Label them with a header: ${selectedJokes}. Use this as subject matter context for the jokes: `;
    } else if (assistantChoice === 'Topics') {
      prefix =
        'Help come up with good topics for writing standup material. ' +
        'Almost anything can be a good topic, the point of what we are doing ' +
        'now is to simply brainstorm by coming up with a diverse set of potential topics. ' +
        'Please help me do this by coming back with a variety of words and phrases that might ' +
        `be worth discussing general area of `;
      // "Some example topics people discuss are experiences growing up, things that have changed in their life recently, " +
      // "travel, recent news, pop culture, music, ";
    } else if (assistantChoice === 'Bits') {
      prefix =
        `Help me develop a bit / premise for jokes. Good ones are clear and state an opinion about how a person feels or thinks about a particular thing. It might be helpful to give some examples based on the topic below and also to ask a set of follow up questions geared around the below topic. Here are some examples of the types of follow up questions that can be relevant, but by no means is it exhaustive: ${exampleBitQuestions}` +
        "I'm trying to develop one on the topic of ";
    }
    prompt = prefix + prompt;
    return prompt;
  };

  const sendMessage = async () => {
    // Send the user's message to the server
    try {
      setLoading(true); // Set loading to true when sending message
      const prompt = getPrompt();
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setChatProps({
        ...chatProps,
        [assistantChoice]: {
          ...chatProps[assistantChoice],
          streamedResponse: data.message,
        },
      });
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
        onChange={(e) =>
          setChatProps({
            ...chatProps,
            [assistantChoice]: {
              ...chatProps[assistantChoice],
              inputValue: e.target.value,
            },
          })
        }
      />
      <button onClick={onSubmit}>➡️</button>
      {assistantChoice === 'Jokes' && (
        <div>
          <label>
            Number of example jokes:
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
        <div className="text-green-500 markdown-content">
          <ReactMarkdown>{streamedResponse}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default Chat;
