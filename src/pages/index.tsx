import { useEffect, useState } from 'react';
import Topic from '../components/topic';

type Joke = {
  id: string;
  line: string;
  bitId: string;
};

type Bit = {
  id: string;
  jokes: Joke[];
  premise: string;
  context: string;
  topicId: string;
};

type Topic = {
  bits: Bit[];
  id: string;
  topic: string;
  userEmail: string;
};

export default function Home() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [newPremise, setNewPremise] = useState<string>('');
  const [newJoke, setNewJoke] = useState<string>('');

  const createTopic = async () => {
    const res = await fetch('/api/topics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      console.log('New topic created successfully');
      const newTopic = await res.json();
      setTopics([...topics, newTopic]);
    } else {
      console.error('Failed to create new topic');
    }
  };

  useEffect(() => {
    const fetchTopics = async () => {
      const res = await fetch('/api/topics');
      if (res.ok) {
        const data = await res.json();
        setTopics(data);
      } else {
        console.error('Failed to fetch topics.');
      }
    };

    fetchTopics();
  }, []);

  useEffect(() => {
    console.log(topics);
  }, [topics]);

  return (
    <>
      <h1 className="text-3xl font-bold underline text-pink-500">
        Hello world!
      </h1>
      <button onClick={createTopic}>Create New Topic</button>
      <div>
        {topics.map((topic) => (
          <Topic key={topic.id} topic={topic} />
        ))}
      </div>
      {/* {topics.map((topic) => (
        <div key={topic.id} className="bg-slate-400">
          <h3>{topic.topic}</h3>
          <div className="my-4">
            <form>
              <input
                className="border border-gray-300 rounded p-2"
                placeholder={`Enter premise for ${topic.topic || ''}`}
                value={newPremise}
                onChange={(e) => setNewPremise(e.target.value)}
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit">
                Add Bit
              </button>
            </form>
            {topic.bits.map((bit) => (
              <div key={bit.id} className="my-4 ml-4">
                <form>
                  <input
                    className="border border-gray-300 rounded p-2"
                    placeholder={`Enter joke for ${bit.premise || ''}`}
                    value={newJoke}
                    onChange={(e) => setNewJoke(e.target.value)}
                  />
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    type="submit">
                    Add Joke
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      ))} */}
    </>
  );
}
