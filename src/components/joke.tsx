import { useState } from 'react';

const Joke = ({ joke }) => {
  const [jokeDetails, setJokeDetails] = useState({ content: joke.content });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJokeDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const deleteJoke = async (jokeId: string) => {
    const res = await fetch(
      `/api/topics/${jokeId}/bits/${jokeId}/jokes/${jokeId}`,
      {
        method: 'DELETE',
      }
    );
    if (res.ok) {
      console.log('Topic deleted successfully');
    } else {
      console.error('Failed to delete topic');
    }
  };

  return (
    <div style={{ marginLeft: '20px' }}>
      <label>Joke: </label>
      <textarea
        name="content"
        value={jokeDetails.content}
        onChange={handleChange}
        style={{ color: 'black', width: '100%', minHeight: '100px' }}
      />
      <button onClick={() => deleteJoke(joke.id)}>X</button>
    </div>
  );
};

export default Joke;
