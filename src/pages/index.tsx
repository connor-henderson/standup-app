import { useEffect, useState } from 'react';

// type Topic = {
//   topic: string;
// };

export default function Home() {
  const [topics, setTopics] = useState<any[]>([]);
  const createTopic = async () => {
    const res = await fetch('/api/topics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: null,
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

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button onClick={createTopic}>Create New Topic</button>
      {topics.map((topic, i) => (
        <input key={i} placeholder={`Enter joke for ${topic.topic || ''}`} />
      ))}
    </>
  );
}
