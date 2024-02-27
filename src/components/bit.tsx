import { useEffect, useState } from 'react';
import Joke from './joke';

const Bit = ({ bit }) => {
  const [bitDetails, setBitDetails] = useState({
    premise: bit.premise,
    context: bit.context,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBitDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const updateBit = async () => {
    try {
      const res = await fetch(`/api/topics/${bit.id}/bits/${bit.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          premise: bitDetails.premise,
          context: bitDetails.context,
        }),
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

  const deleteBit = async (bitId: string) => {
    const res = await fetch(`/api/topics/${bitId}/bits/${bitId}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      console.log('Bit deleted successfully');
    } else {
      console.error('Failed to delete bit');
    }
  };

  const addJoke = async () => {
    try {
      const res = await fetch(`/api/topics/${bit.id}/bits/${bit.id}/jokes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ line: '' }),
      });
      if (res.ok) {
        console.log('Joke added successfully');
      } else {
        console.error('Failed to add joke');
      }
    } catch (error) {
      console.error('Error adding joke', error);
    }
  };

  useEffect(() => {
    updateBit();
  }, [bitDetails]);

  return (
    <div className="m-2 p-1">
      <label htmlFor="name">Bit:</label>
      <input
        name="premise"
        value={bitDetails.premise}
        onChange={handleChange}
        style={{ color: 'black' }}
      />
      <label htmlFor="context">Context:</label>
      <textarea
        name="context"
        value={bitDetails.context}
        onChange={handleChange}
        style={{ color: 'black' }}
      />
      {bit.jokes?.map((joke) => (
        <Joke key={joke.id} joke={joke} />
      ))}
      <button onClick={() => deleteBit(bit.id)}>X</button>
      <button onClick={addJoke}>Add Joke</button>
    </div>
  );
};

export default Bit;
