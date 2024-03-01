import { useEffect, useState, ChangeEvent } from 'react';
import useDebounce from '../hooks/useDebounce';

const Joke = ({ joke, setJokes }) => {
  const [line, setLine] = useState(joke.line);
  const debouncedLine = useDebounce(line, 500);

  const handleChange = (e) => {
    setLine(e.target.value);
  };

  useEffect(() => {
    const updateJoke = async () => {
      try {
        const res = await fetch(`/api/jokes/${joke.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ line: debouncedLine }),
        });
        if (!res.ok) throw new Error('Failed to update joke');
      } catch (error) {
        console.error('Error updating joke', error);
      }
    };

    updateJoke();
  }, [debouncedLine, joke.id]);

  const deleteJoke = async () => {
    try {
      const res = await fetch(`/api/jokes/${joke.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete joke');
      setJokes((jokes) =>
        jokes.filter((j) => j.id !== joke.id)
      );
    } catch (error) {
      console.error('Error deleting joke', error);
    }
  };

  return (
    <div className="joke-container ml-5 bg-gray-100 p-4 rounded-lg shadow">
      <label
        htmlFor="joke-line"
        className="block text-lg font-medium text-gray-700">
        Joke
      </label>
      <textarea
        id="joke-line"
        name="line"
        placeholder="Add a setup and punchline"
        value={line}
        onChange={handleChange}
        className="joke-textarea mt-1 text-white w-full min-h-[100px] border-gray-300 focus:ring-blue-500 focus:border-blue-500 block rounded-md shadow-sm p-2"></textarea>
      <button
        onClick={deleteJoke}
        className="delete-joke-btn mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
        Delete
      </button>
    </div>
  );
};

export default Joke;
