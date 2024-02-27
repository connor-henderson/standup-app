import { useEffect, useState } from 'react';

const Joke = ({ joke, setJokes }) => {
  const [line, setLine] = useState(joke.line);

  const handleChange = (e) => {
    setLine(e.target.value);
  };

  const updateJoke = async () => {
    try {
      const res = await fetch(`/api/jokes/${joke.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ line }),
      });
      if (res.ok) {
        console.log('Joke updated successfully');
      } else {
        console.error('Failed to update joke');
      }
    } catch (error) {
      console.error('Error updating joke', error);
    }
  };

  useEffect(() => {
    updateJoke();
  }, [line]);

  const deleteJoke = async () => {
    const res = await fetch(`/api/jokes/${joke.id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      console.log('Joke deleted successfully');
      setJokes((jokes) => jokes.filter((j) => j.id !== joke.id));
    } else {
      console.error('Failed to delete joke');
    }
  };

  return (
    <div style={{ marginLeft: '20px' }}>
      <label>Joke: </label>
      <textarea
        name="line"
        value={line}
        onChange={handleChange}
        style={{ color: 'black', width: '100%', minHeight: '100px' }}
      />
      <button onClick={() => deleteJoke()}>X</button>
    </div>
  );
};

export default Joke;
