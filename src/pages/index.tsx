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
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const createTopic = async () => {
    const res = await fetch('/api/topics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic: 'New Topic' }), // Pass 'New Topic' as the topic when creating a new topic
    });
    if (res.ok) {
      console.log('New topic created successfully');
      const newTopic = await res.json();
      setTopics([...topics, newTopic]);
    } else {
      console.error('Failed to create new topic');
    }
  };

  const deleteTopic = async (topicId: string) => {
    const res = await fetch(`/api/topics/${topicId}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      console.log('Topic deleted successfully');
      setTopics(topics.filter((topic) => topic.id !== topicId));
      setSelectedTopic(null);
    } else {
      console.error('Failed to delete topic');
    }
  };

  useEffect(() => {
    const fetchAndSetTopics = async () => {
      const res = await fetch('/api/topics');
      if (res.ok) {
        const data = await res.json();
        setTopics(data);
        setSelectedTopic(data[0]);
      } else {
        console.error('Failed to fetch topics.');
      }
    };

    fetchAndSetTopics();
  }, []);

  return (
    <>
      <h1 className="text-2xl text-pink-500">Hello world!</h1>
      <button onClick={createTopic}>Create New Topic</button>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          {topics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <div>{topic.topic}</div>
              <button onClick={() => deleteTopic(topic.id)}> X </button>
            </div>
          ))}
        </div>
        <div style={{ flex: 2 }}>
          {selectedTopic && <Topic topic={selectedTopic} />}
        </div>
      </div>
    </>
  );
}
