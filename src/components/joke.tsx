import { useState } from 'react';

const Joke = ({ joke }) => {
  const [editMode, setEditMode] = useState(false);
  const [jokeDetails, setJokeDetails] = useState({ content: joke.content });

  const handleEditToggle = () => setEditMode(!editMode);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJokeDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  return (
    <div style={{ marginLeft: '20px' }}>
      {editMode ? (
        <>
          <textarea
            name="content"
            value={jokeDetails.content}
            onChange={handleChange}
          />
          <button onClick={handleEditToggle}>Save</button>
        </>
      ) : (
        <>
          <p>{joke.content}</p>
          <button onClick={handleEditToggle}>Edit</button>
        </>
      )}
    </div>
  );
};

export default Joke;
