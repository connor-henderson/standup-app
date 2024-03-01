import React, { useEffect, useState, ChangeEvent } from 'react';
import Joke from './joke';
import useDebounce from '../hooks/useDebounce';

interface BitProps {
  bit: {
    id: string;
    premise: string;
    context: string;
    jokes: Array<{ id: string; line: string }>;
  };
  setBits: React.Dispatch<React.SetStateAction<BitProps['bit'][]>>;
}

const Bit: React.FC<BitProps> = ({ bit, setBits }) => {
  const [bitDetails, setBitDetails] = useState<
    Pick<BitProps['bit'], 'premise' | 'context'>
  >({
    premise: bit.premise,
    context: bit.context,
  });
  const [jokes, setJokes] = useState<BitProps['bit']['jokes']>(bit.jokes);
  const debouncedBitDetails = useDebounce(bitDetails, 500);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBitDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const updateBit = async () => {
    try {
      const res = await fetch(`/api/bits/${bit.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(debouncedBitDetails),
      });
      if (res.ok) {
        console.log('Bit updated successfully');
      } else {
        console.error('Failed to update bit');
      }
    } catch (error) {
      console.error('Error updating bit', error);
    }
  };

  const deleteBit = async () => {
    try {
      const res = await fetch(`/api/bits/${bit.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        console.log('Bit deleted successfully');
        setBits((bits) => bits.filter((b) => b.id !== bit.id));
      } else {
        console.error('Failed to delete bit');
      }
    } catch (error) {
      console.error('Error deleting bit', error);
    }
  };

  const addJoke = async () => {
    try {
      const res = await fetch(`/api/bits/${bit.id}/jokes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ line: '' }),
      });
      if (res.ok) {
        console.log('Joke added successfully');
        const newJoke = await res.json();
        setJokes((prevJokes) => [...prevJokes, newJoke]);
      } else {
        console.error('Failed to add joke');
      }
    } catch (error) {
      console.error('Error adding joke', error);
    }
  };

  useEffect(() => {
    updateBit();
  }, [debouncedBitDetails]);

  return (
    <div className="bit-container m-4 p-4 bg-gray-50 shadow-lg rounded-lg">
      <div className="bit-details mb-4">
        <div className="mb-2">
          <label
            htmlFor="premise"
            className="block text-lg font-semibold text-gray-700">
            Premise:
          </label>
          <input
            id="premise"
            name="premise"
            value={bitDetails.premise}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
        <div>
          <label
            htmlFor="context"
            className="block text-lg font-semibold text-gray-700">
            Context:
          </label>
          <textarea
            id="context"
            name="context"
            value={bitDetails.context}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
            rows={4}
          />
        </div>
      </div>
      <div className="jokes-list mb-4">
        {jokes.map((joke) => (
          <Joke key={joke.id} setJokes={setJokes} joke={joke} />
        ))}
      </div>
      <div className="bit-actions flex justify-between">
        <button
          onClick={deleteBit}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors">
          Delete
        </button>
        <button
          onClick={addJoke}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors">
          Add Joke
        </button>
      </div>
    </div>
  );
};

export default Bit;
