import { useEffect, useState } from 'react';
import Topic from '../components/topic';
import AIAssistant from '../components/ai-assistant';

type JokeType = {
  id: string;
  line: string;
  bitId: string;
};

type BitType = {
  id: string;
  jokes: JokeType[];
  premise: string;
  context: string;
  topicId: string;
};

type TopicType = {
  bits: BitType[];
  id: string;
  topic: string;
  userEmail: string;
};

export default function Home() {
  const [topics, setTopics] = useState<TopicType[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<TopicType | null>(null);

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

  const setUpdatedTopic = (newTopic: TopicType) => {
    const newTopics = topics.map((topic) =>
      topic.id === newTopic.id ? newTopic : topic
    );
    setTopics(newTopics);
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
      <h1 className="text-4xl font-bold text-blue-500 mb-8">Comedy Notebook</h1>
      <button className="custom-btn mb-4" onClick={createTopic}>
        Create New Topic
      </button>
      <div className="flex flex-col md:flex-row">
        <div className="max-w-full md:max-w-[400px] mb-4 md:mb-0">
        {topics.map((topic) => {
            const bgColor =
              selectedTopic?.id === topic.id ? 'bg-gray-500' : 'bg-navy-600';
            return (
              <div
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`flex justify-between items-center p-2 m-2 ${bgColor} rounded-lg cursor-pointer hover:bg-navy-500 transition-colors`}>
                <div className="text-white">
                  {topic.topic.length > 20
                    ? `${topic.topic.substring(0, 17)}...`
                    : topic.topic}
                </div>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTopic(topic.id);
                  }}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex-1 mb-4 md:mb-0 md:mr-4">
          <AIAssistant topic={selectedTopic?.topic || ''} />
        </div>
        <div className="flex-auto">
          {selectedTopic && (
            <Topic topic={selectedTopic} setUpdatedTopic={setUpdatedTopic} />
          )}
        </div>
      </div>
    </>
  );
}
