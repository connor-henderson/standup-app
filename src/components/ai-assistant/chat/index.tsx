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
    return (
      <div className="flex flex-col items-start">
        <p className="italic text-gray-800">{label}</p>
        {assistantChoice === 'Chat' && (
          <div className="flex items-center mt-2">
            <img src="/draft.svg" alt="Draft" className="w-5 h-5 bg-white" />
            <p className="ml-2 text-sm font-medium">{topic}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
      <div className="mb-4 text-lg font-semibold">{getLabel()}</div>
      <textarea
        className="mt-4 w-full p-2 text-white rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        rows={4}
        placeholder="Enter any custom instructions..."
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
      <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        onClick={onSubmit}>
        Send
      </button>
      {assistantChoice === 'Jokes' && (
        <div className="mt-4">
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Number of example jokes:
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={numExamples}
                onChange={(e) => setNumExamples(parseInt(e.target.value))}>
                {[...Array(10)].map((num, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(selectedJokeTypes).map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
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
                <span className="text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      {loading ? (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="mt-4 text-gray-800 markdown-content">
          <ReactMarkdown>{streamedResponse}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default Chat;
