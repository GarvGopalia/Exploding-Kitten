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
  cardsDrawnCount: 0, // Track how many cards have been drawn
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
      if (action.payload) {
        state.username = action.payload; // Set the username if provided
      }
      state.gameStarted = true;
      state.gameOver = false;
      state.win = false;
      state.defuseCardUsed = false;
      state.cardsDrawnCount = 0; // Reset cards drawn count

      // Initialize the deck with multiple cards
      const deck = [
        '😼 Cat card', '😼 Cat card', '😼 Cat card', '😼 Cat card', '😼 Cat card', '😼 Cat card', '😼 Cat card', '😼 Cat card', '😼 Cat card', '😼 Cat card', // 10 Cat cards
        '💣 Exploding kitten card', '💣 Exploding kitten card', '💣 Exploding kitten card', // 3 Exploding Kitten cards
        '🙅‍♂️ Defuse card', '🙅‍♂️ Defuse card', // 2 Defuse cards
        '🔀 Shuffle card', // 1 Shuffle card
      ];
      state.cards = shuffleArray(deck); // Shuffle the deck
      state.drawnCards = [];
    },

    // Action to draw a card
    drawCard: (state) => {
      if (state.cards.length === 0 || state.gameOver || state.cardsDrawnCount >= 5) return; // Stop if no cards left or game is over or 5 cards drawn

      const card = state.cards.pop(); // Draw a card from the deck
      state.drawnCards.push(card);
      state.cardsDrawnCount++; // Increment cards drawn count

      // Handle different card types
      if (card === '😼 Cat card') {
        // Cat card logic (no additional action)
      } else if (card === '💣 Exploding kitten card') {
        // Game over if Exploding Kitten card is drawn
        if (!state.defuseCardUsed) {
          state.gameOver = true;
        } else {
          state.defuseCardUsed = false; // Reset defuse status after using it
        }
      } else if (card === '🙅‍♂️ Defuse card') {
        state.defuseCardUsed = true;
      } else if (card === '🔀 Shuffle card') {
        // Reset the deck with 5 cards again when shuffle card is drawn
        const deck = [
          '😼 Cat card', '😼 Cat card', '😼 Cat card', '😼 Cat card', '😼 Cat card','😼 Cat card', '😼 Cat card', '😼 Cat card', '😼 Cat card', '😼 Cat card', // 10 Cat cards
          '💣 Exploding kitten card', '💣 Exploding kitten card', '💣 Exploding kitten card', // 3 Exploding Kitten cards
          '🙅‍♂️ Defuse card', '🙅‍♂️ Defuse card', // 2 Defuse cards
          '🔀 Shuffle card', // 1 Shuffle card
        ];
        state.cards = shuffleArray(deck); // Shuffle the new deck
        state.drawnCards = []; // Reset drawn cards to start fresh
        state.cardsDrawnCount = 0; // Reset the drawn count
      }

      // Check for win condition after 5 cards are drawn
      if (state.cardsDrawnCount === 5 && !state.gameOver) {
        // If no Exploding Kitten card was drawn, player wins
        state.win = true;
        state.gameOver = true; // End the game
      }
    },

    // Action to reset the game without asking for username
    playAgain: (state) => {
      state.gameStarted = true;
      state.gameOver = false;
      state.win = false;
      state.defuseCardUsed = false;
      state.cardsDrawnCount = 0; // Reset the drawn count

      // Initialize the deck with multiple cards
      const deck = [
        '😼 Cat card', '😼 Cat card', '😼 Cat card', '😼 Cat card', '😼 Cat card','😼 Cat card', '😼 Cat card', '😼 Cat card', '😼 Cat card', '😼 Cat card', // 10 Cat cards
        '💣 Exploding kitten card', '💣 Exploding kitten card', '💣 Exploding kitten card', // 3 Exploding Kitten cards
        '🙅‍♂️ Defuse card', '🙅‍♂️ Defuse card', // 2 Defuse cards
        '🔀 Shuffle card', // 1 Shuffle card
      ];
      state.cards = shuffleArray(deck); // Shuffle the deck
      state.drawnCards = [];
    },
  },
});

export const { startGame, drawCard, playAgain } = gameSlice.actions;
export default gameSlice.reducer;
