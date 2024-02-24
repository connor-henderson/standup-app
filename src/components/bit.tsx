import { useState } from 'react';
import Joke from './joke';

const Bit = ({ bit }) => {
  const [bitDetails, setBitDetails] = useState({
    name: bit.name,
    description: bit.description,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBitDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  return (
    <div className="m-2 p-1">
      <label htmlFor="name">Bit:</label>
      <input
        name="name"
        value={bitDetails.name}
        onChange={handleChange}
        style={{ color: 'black' }}
      />
      <label htmlFor="description">Description:</label>
      <textarea
        name="description"
        value={bitDetails.description}
        onChange={handleChange}
        style={{ color: 'black' }}
      />
      {bit.jokes?.map((joke) => (
        <Joke key={joke.id} joke={joke} />
      ))}
    </div>
  );
};

export default Bit;
