import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboard } from '../store/gameSlice'; 

const Leaderboard = () => {
  const dispatch = useDispatch();
  const leaderboard = useSelector((state) => state.game.leaderboard);
  const loading = useSelector((state) => state.game.loading);
  const error = useSelector((state) => state.game.error);
  
  // Fetch leaderboard data on mount
  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  if (loading) {
    return <div>Loading leaderboard...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <p>No players have won yet.</p>
      ) : (
        <ul>
          {leaderboard.map((player, index) => (
            <li key={index}>
              <span>{player.username}: </span>
              <strong>{player.score} points</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
