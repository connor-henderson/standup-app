import Bit from './bit';

const Topic = ({ topic }) => {
  const handleChange = (e) => {
    topic.name = e.target.value;
  };
  return (
    <div className="m-5 p-2 border border-gray-400 rounded-lg">
      <p>Topic: </p>
      <input
        name="topic"
        value={topic.topic}
        onChange={handleChange}
        style={{ color: 'black' }}
      />
      {topic.bits?.map((bit) => (
        <Bit key={bit.id} bit={bit} />
      ))}
    </div>
  );
};

export default Topic;
