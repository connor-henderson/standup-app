import useDebounce from '../hooks/useDebounce';
import Bit from './bit';
import { useState, useEffect } from 'react';

interface TopicProps {
  topic: {
    id: string;
    topic: string;
  };
  setUpdatedTopic: (topic: { id: string; topic: string }) => void;
}

const Topic: React.FC<TopicProps> = ({ topic, setUpdatedTopic }) => {
  const [topicValue, setTopicValue] = useState<string>(topic.topic);
  const debouncedTopicValue = useDebounce(topicValue, 500);
  const [bits, setBits] = useState([]);

  useEffect(() => {
    setTopicValue(topic.topic);
  }, [topic.topic]);

  useEffect(() => {
    const fetchBits = async () => {
      try {
        const res = await fetch(`/api/topics/${topic.id}/bits`);
        if (!res.ok) throw new Error('Failed to fetch bits');
        const data = await res.json();
        setBits(data);
      } catch (error) {
        console.error('Error fetching bits', error);
      }
    };

    fetchBits();
  }, [topic.id]);

  const updateTopic = async () => {
    try {
      const res = await fetch(`/api/topics/${topic.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: debouncedTopicValue }),
      });
      if (!res.ok) throw new Error('Failed to update topic');
      const newTopic = await res.json();
      setUpdatedTopic(newTopic);
    } catch (error) {
      console.error('Error updating topic', error);
    }
  };

  const addBit = async () => {
    try {
      const res = await fetch(`/api/topics/${topic.id}/bits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ line: '' }),
      });
      if (!res.ok) throw new Error('Failed to add bit');
      const newBit = await res.json();
      setBits((prevBits) => [...prevBits, newBit]);
    } catch (error) {
      console.error('Error adding bit', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopicValue(e.target.value);
  };

  useEffect(() => {
    updateTopic();
  }, [debouncedTopicValue]);

  return (
    <div className="topic-container m-5 p-2 border border-gray-500 rounded-lg relative bg-navy-600 shadow-lg">
      <p className="text-white font-semibold">Topic:</p>
      <input
        name="topic"
        value={topicValue}
        onChange={handleChange}
        className="topic-input w-full p-2 mt-2 mb-4 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-white"
      />
      {bits.map((bit) => (
        <Bit key={bit.id} setBits={setBits} bit={bit} />
      ))}
      <button
        onClick={addBit}
        className="add-bit-btn mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors">
        Add Bit
      </button>
    </div>
  );
};

export default Topic;
