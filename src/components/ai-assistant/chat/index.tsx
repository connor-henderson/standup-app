import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const Chat = ({
  assistantChoice,
  chatProps,
  setChatProps,
  topic,
}: {
  assistantChoice: string;
  chatProps: any;
  setChatProps: any;
  topic: string;
}) => {
  const { inputValue, streamedResponse } = chatProps[assistantChoice]; // Key into chatProps based on assistantChoice

  const [loading, setLoading] = useState(false); // Added loading state
  const [selectedJokeTypes, setSelectedJokeTypes] = useState({
    sarcasm: {
      selected: false,
      description: 'Using irony to mock or convey contempt',
    },
    'saying it without saying it': {
      selected: false,
      description: 'Implying something without explicitly stating it',
    },
    Exaggeration: {
      selected: false,
      description: 'Overstating or magnifying the truth',
    },
    Understatement: {
      selected: false,
      description: 'Presenting something as less important than it actually is',
    },
    Misdirection: {
      selected: false,
      description: 'Deliberately leading the audience in the wrong direction',
    },
    'Illogical conclusions': {
      selected: false,
      description: 'Drawing conclusions that do not logically follow',
    },
    Substitution: {
      selected: false,
      description: 'Replacing one element with another for comedic effect',
    },
    Comparison: {
      selected: false,
      description: 'Highlighting similarities or differences for humor',
    },
    'Unspoken conclusion': {
      selected: false,
      description: 'Implied punchline without explicitly stating it',
    },
    'Jumping to conclusions': {
      selected: false,
      description: 'Making hasty or illogical assumptions',
    },
    'Taking things too literally': {
      selected: false,
      description: 'Interpreting things in a strictly literal sense',
    },
    'Recognition Laughs': {
      selected: false,
      description: 'Humor derived from shared experiences or references',
    },
    'Personification / Act–outs': {
      selected: false,
      description:
        'Giving human traits to non-human objects or acting out scenarios',
    },
  }); // Added state for selected joke types
  const [numExamples, setNumExamples] = useState(1); // Added state for numExamples

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
    if (assistantChoice === 'Chat') {
      prefix = 'For context, here is my current topic: ' + topic; // where my topic, premise, context, and joke develpment currently stands
    } else if (assistantChoice === 'Associations') {
      prefix =
        'Respond with about 30 word / phrase associations for the following phrase, each separated by a comma and space';
    } else if (assistantChoice === 'Jokes') {
      const selectedJokes = Object.keys(selectedJokeTypes)
        .filter((type) => selectedJokeTypes[type]['selected'])
        .map((key) => `${key} (${selectedJokeTypes[key]['description']})`)
        .join(', ');
      prefix = `Respond with ${numExamples} example(s) for each of the following types of jokes and Label them with a header: ${selectedJokes}. Only respond with a header of the joke type and then the jokes, for each joke type. Use this as subject matter context for the jokes: `;
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

  const getLabel = () => {
    let label = '';
    switch (assistantChoice) {
      case 'Chat':
        label = `Chat with your draft preloaded into context`;
        break;
      case 'Associations':
        label = 'Get associations for any word or phrase';
        break;
      case 'Topics':
        label = 'Get help choosing a topic';
        break;
      case 'Bits':
        label = 'Get help coming up with a bit';
        break;
      case 'Jokes':
        label = 'Get some example jokes for any given topic or premise';
        break;
      default:
        label = 'Custom instructions: ';
    }
    if (assistantChoice === 'Chat')
      return (
        <div>
          <p className="italic inline">{label}</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/draft.svg"
              alt="Draft"
              style={{ width: '20px', backgroundColor: 'white' }}
            />
            <p className="ml-2">{topic}</p>
          </div>
        </div>
      );
    else return <p className="italic inline">{label}</p>;
  };

  return (
    <div>
      <div className="mb-2">{getLabel()}</div>
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
          {Object.keys(selectedJokeTypes).map((type) => (
            <label key={type}>
              <input
                type="checkbox"
                checked={selectedJokeTypes[type]['selected']}
                onChange={() =>
                  setSelectedJokeTypes({
                    ...selectedJokeTypes,
                    [type]: {
                      ...selectedJokeTypes[type],
                      selected: !selectedJokeTypes[type]['selected'],
                    },
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
