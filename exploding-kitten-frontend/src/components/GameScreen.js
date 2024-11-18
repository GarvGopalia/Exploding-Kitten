// src/components/GameScreen.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGame, drawCard } from '../store/gameSlice';

const GameScreen = () => {
  const dispatch = useDispatch();
  const { cards, drawnCards, gameStarted, username, gameOver, win, defuseCardUsed } = useSelector((state) => state.game);

  // Local state to handle the username input
  const [enteredUsername, setEnteredUsername] = useState('');

  // Handler for starting the game
  const handleStartGame = () => {
    if (enteredUsername.trim()) {
      dispatch(startGame(enteredUsername)); // Dispatch username when starting the game
    } else {
      alert('Please enter a username!');
    }
  };

  // Handler for drawing a card
  const handleDrawCard = () => {
    dispatch(drawCard());
  };

  return (
    <div>
      <h1>Exploding Kitten Game</h1>

      {!gameStarted ? (
        <div>
          <input
            type="text"
            placeholder="Enter your username"
            value={enteredUsername}
            onChange={(e) => setEnteredUsername(e.target.value)}
          />
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {username}!</h2>
          <h3>Cards Remaining: {cards.length}</h3>
          <button onClick={handleDrawCard} disabled={gameOver}>Draw Card</button>

          <div>
            <h3>Drawn Cards:</h3>
            <ul>
              {drawnCards.map((card, index) => (
                <li key={index}>{card}</li>
              ))}
            </ul>
          </div>

          {gameOver && (
            <div>
              {win ? <h3>Congratulations! You won the game!</h3> : <h3>Game Over! Try again!</h3>}
              {defuseCardUsed && !win && <h4>You used a Defuse card!</h4>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameScreen;
