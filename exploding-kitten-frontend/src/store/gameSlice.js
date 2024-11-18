// src/store/gameSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Initial state for the game
const initialState = {
  cards: [], // Deck of cards
  drawnCards: [], // Cards that have been drawn
  gameStarted: false, // Flag to indicate if the game has started
  username: '', // Player's username
  gameOver: false, // Flag to track if the game is over
  win: false, // Flag to track if the player won
  defuseCardUsed: false, // Track if defuse card has been used
};

// Helper function to shuffle the cards
const shuffleArray = (array) => {
  let shuffledArray = array.slice(); // Make a copy of the array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
};

// Create the game slice
const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // Action to start the game
    startGame: (state, action) => {
      state.username = action.payload; // Set the username
      state.gameStarted = true;
      state.gameOver = false;
      state.win = false;
      state.defuseCardUsed = false;

      // Initialize the deck with 5 shuffled cards
      const deck = ['😼 Cat card', '🙅‍♂️ Defuse card', '🔀 Shuffle card', '💣 Exploding kitten card', '🔀 Shuffle card'];
      state.cards = shuffleArray(deck); // Shuffle the deck
      state.drawnCards = [];
    },

    // Action to draw a card
    drawCard: (state) => {
      if (state.cards.length === 0 || state.gameOver) return; // Stop if no cards left or game is over

      const card = state.cards.pop(); // Draw a card from the deck
      state.drawnCards.push(card);

      // Handle different card types
      if (card === '😼 Cat card') {
        // Remove the Cat card from the deck
        console.log('Cat card drawn');
      } else if (card === '💣 Exploding kitten card') {
        // Game over if Exploding kitten card is drawn
        if (!state.defuseCardUsed) {
          state.gameOver = true;
          console.log('Game Over! Exploding Kitten card drawn');
        } else {
          // If Defuse card was used, the bomb is defused
          state.defuseCardUsed = false; // Reset defuse status after using it
          console.log('Bomb defused!');
        }
      } else if (card === '🙅‍♂️ Defuse card') {
        // Remove the defuse card from the deck and enable bomb defuse
        state.defuseCardUsed = true;
        console.log('Defuse card drawn');
      } else if (card === '🔀 Shuffle card') {
        // Shuffle the deck and reset it with 5 cards
        const deck = ['😼 Cat card', '🙅‍♂️ Defuse card', '🔀 Shuffle card', '💣 Exploding kitten card', '🔀 Shuffle card'];
        state.cards = shuffleArray(deck); // Shuffle after shuffle card is drawn
        console.log('Deck shuffled and reset');
      }

      // Check for win condition: if all cards have been drawn
      if (state.cards.length === 0) {
        state.win = true;
        state.gameOver = true; // End the game
        console.log('Congratulations! You won!');
      }
    },
  },
});

// Export actions from the slice
export const { startGame, drawCard } = gameSlice.actions;

// Export the reducer to be used in the store
export default gameSlice.reducer;
