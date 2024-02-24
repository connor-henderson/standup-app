import { useState } from 'react';

type Topic = {
  topic: string;
};

export default function Home() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const createTopic = async () => {
    const res = await fetch('/api/topics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic: 'New Topic' }),
    });
    if (res.ok) {
      console.log('New topic created successfully');
      const newTopic = await res.json();
      setTopics([...topics, newTopic.topic]);
    } else {
      console.error('Failed to create new topic');
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button onClick={createTopic}>Create New Topic</button>
      {topics.map((topic, i) => (
        <input key={i} placeholder={`Enter joke for ${topic.topic}`} />
      ))}
    </>
  );
}
