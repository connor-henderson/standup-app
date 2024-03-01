import useDebounce from '../hooks/useDebounce';
import Bit from './bit';
import { useState, useEffect } from 'react';

const Topic = ({ topic, setUpdatedTopic }) => {
  const [topicValue, setTopicValue] = useState(topic.topic);
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

  const handleChange = (e) => {
    setTopicValue(e.target.value);
  };

  useEffect(() => {
    updateTopic();
  }, [debouncedTopicValue]);

  return (
    <div className="topic-container m-5 p-4 border-4 border-gray-600 rounded-xl relative bg-gradient-to-r from-gray-700 to-gray-900 shadow-xl">
      <p className="text-gray-300 font-bold text-lg">Topic:</p>
      <input
        name="topic"
        value={topicValue}
        onChange={handleChange}
        className="topic-input w-full p-3 mt-3 mb-5 bg-gray-800 border-2 border-gray-600 rounded-lg shadow-inner focus:border-gray-500 focus:ring focus:ring-gray-300 focus:ring-opacity-50 text-white"
      />
      {bits.map((bit) => (
        <Bit key={bit.id} setBits={setBits} bit={bit} />
      ))}
      <button
        onClick={addBit}
        className="add-bit-btn mt-5 px-5 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors ease-in-out duration-300">
        Add Bit
      </button>
    </div>
  );
};

export default Topic;
