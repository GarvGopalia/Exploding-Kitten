import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGame, drawCard, playAgain } from '../store/gameSlice';
import './GameScreen.css';

const GameScreen = () => {
  const dispatch = useDispatch();
  const { cards, drawnCards, gameStarted, username, gameOver, win } = useSelector((state) => state.game);
  
  // Local state to handle the username input
  const [enteredUsername, setEnteredUsername] = useState('');
  
  // Handler for starting the game
  const handleStartGame = () => {
    if (enteredUsername.trim()) {
      dispatch(startGame(enteredUsername));
    } else {
      alert('Please enter a username!');
    }
  };
  
  // Handler for drawing a card
  const handleDrawCard = () => {
    dispatch(drawCard());
  };

  // Handler for playing again without asking for username
  const handlePlayAgain = () => {
    dispatch(playAgain());
  };

  // Handler for viewing the leaderboard
  const handleLeaderboard = () => {
    alert('Displaying leaderboard...');
    // You can redirect to the leaderboard page or display it in a modal
  };

  return (
    <div className="container">
      <button className="leaderboard-button" onClick={handleLeaderboard}>Leaderboard</button>
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
          {!gameOver ? (
            <button onClick={handleDrawCard}>Draw Card</button>
          ) : (
            <div>
              {win ? (
                <h3>Congratulations! You won the game!</h3>
              ) : (
                <h3>Game Over! You drew the Exploding Kitten card!</h3>
              )}
              <button onClick={handlePlayAgain}>Play Again</button>
            </div>
          )}

          <div className="card-list">
            <h3>Drawn Cards:</h3>
            <ul>
              {drawnCards.map((card, index) => (
                <li key={index}>{card}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
