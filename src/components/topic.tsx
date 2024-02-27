import Bit from './bit';
import { useState, useEffect } from 'react';

const Topic = ({ topic, setUpdatedTopic }) => {
  const [topicValue, setTopicValue] = useState(topic.topic);

  useEffect(() => {
    setTopicValue(topic.topic);
  }, [topic.topic]);

  const updateTopic = async () => {
    try {
      const res = await fetch(`/api/topics/${topic.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: topicValue }),
      });
      if (res.ok) {
        const newTopic = await res.json();
        console.log(newTopic);
        setUpdatedTopic(newTopic);
        console.log('Topic value updated successfully');
      } else {
        console.error('Failed to update topic value');
      }
    } catch (error) {
      console.error('Error updating topic value', error);
    }
  };

  const deleteTopic = async (topicId: string) => {
    const res = await fetch(`/api/topics/${topicId}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      console.log('Topic deleted successfully');
    } else {
      console.error('Failed to delete topic');
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
      if (res.ok) {
        console.log('Bit added successfully');
        const newBit = await res.json();
        console.log(topic, newBit, 'hello');
      } else {
        console.error('Failed to add bit');
      }
    } catch (error) {
      console.error('Error adding bit', error);
    }
  };

  const handleChange = (e) => {
    const newTopicValue = e.target.value;
    setTopicValue(newTopicValue);
  };

  useEffect(() => {
    updateTopic();
  }, [topicValue]);

  return (
    <div
      className="m-5 p-2 border border-gray-400 rounded-lg"
      style={{ position: 'relative' }}>
      <button
        onClick={() => deleteTopic(topic.id)}
        className="absolute top-0 right-0">
        {' '}
        X{' '}
      </button>
      <p>Topic: </p>
      <input
        name="topic"
        value={topicValue}
        onChange={handleChange}
        style={{ color: 'black' }}
      />
      {topic.bits?.map((bit) => (
        <Bit key={bit.id} bit={bit} />
      ))}
      <button onClick={addBit}>Add Bit</button>
    </div>
  );
};

export default Topic;
