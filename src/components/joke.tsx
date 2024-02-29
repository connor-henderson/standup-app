import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';

const Joke = ({ joke, setJokes }) => {
  const [line, setLine] = useState(joke.line);
  const debouncedLine = useDebounce(line, 500);

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
        body: JSON.stringify({ line: debouncedLine }),
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
  }, [debouncedLine]);

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
