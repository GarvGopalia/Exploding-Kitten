import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startGame } from '../store/gameSlice'; // Import appropriate action or thunk

const UsernameInput = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  const handleStartGame = () => {
    if (username.trim() !== '') {
      dispatch(startGame(username)); // Dispatch the startGame action with the username
    } else {
      alert('Please enter a username.');
    }
  };

  return (
    <div className="username-input">
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default UsernameInput;
