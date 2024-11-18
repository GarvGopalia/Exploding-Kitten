// Game controller logic...
package main

import (
	"context"
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
)

type GameController struct {
	RedisClient *redis.Client
}

var ctx = context.Background()

// Card types
const (
	CatCard         = "😼 Cat Card"
	DefuseCard      = "🙅‍♂️ Defuse Card"
	ShuffleCard     = "🔀 Shuffle Card"
	ExplodingKitten = "💣 Exploding Kitten"
)

// StartGame initializes a new game
func (gc *GameController) StartGame(c *gin.Context) {
	username := c.Query("username")
	if username == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username is required"})
		return
	}

	// Initialize a new deck
	deck := []string{CatCard, DefuseCard, ShuffleCard, ExplodingKitten, CatCard}
	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(deck), func(i, j int) { deck[i], deck[j] = deck[j], deck[i] })

	// Store deck in Redis
	err := gc.RedisClient.Set(ctx, username+":deck", deckToString(deck), 0).Err()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not start the game"})
		return
	}

	// Store initial score
	err = gc.RedisClient.Set(ctx, username+":score", "0", 0).Err()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not set score"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Game started!", "deck": deck})
}

// DrawCard handles drawing a card from the deck
func (gc *GameController) DrawCard(c *gin.Context) {
	username := c.Query("username")
	if username == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username is required"})
		return
	}

	// Get the deck from Redis
	deckStr, err := gc.RedisClient.Get(ctx, username+":deck").Result()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not retrieve deck"})
		return
	}

	deck := stringToDeck(deckStr)
	if len(deck) == 0 {
		c.JSON(http.StatusOK, gin.H{"message": "You have already drawn all cards. You win!"})
		return
	}

	// Draw the top card
	card := deck[0]
	deck = deck[1:]

	// Handle card logic
	switch card {
	case CatCard:
		// Just remove it from the deck
	case DefuseCard:
		// No additional logic needed for now
	case ShuffleCard:
		// Refill and reshuffle the deck
		deck = []string{CatCard, DefuseCard, ShuffleCard, ExplodingKitten, CatCard}
		rand.Shuffle(len(deck), func(i, j int) { deck[i], deck[j] = deck[j], deck[i] })
	case ExplodingKitten:
		c.JSON(http.StatusOK, gin.H{"message": "You drew an Exploding Kitten! Game over!"})
		return
	}

	// Update the deck in Redis
	err = gc.RedisClient.Set(ctx, username+":deck", deckToString(deck), 0).Err()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not update deck"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("You drew: %s", card), "remainingDeck": deck})
}

// Leaderboard returns the current leaderboard
func (gc *GameController) Leaderboard(c *gin.Context) {
	users, err := gc.RedisClient.Keys(ctx, "*:score").Result()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not retrieve leaderboard"})
		return
	}

	leaderboard := make(map[string]int)
	for _, user := range users {
		scoreStr, err := gc.RedisClient.Get(ctx, user).Result()
		if err != nil {
			continue
		}

		username := user[:len(user)-6] // Remove ":score" from key
		score := 0
		fmt.Sscanf(scoreStr, "%d", &score)
		leaderboard[username] = score
	}

	c.JSON(http.StatusOK, gin.H{"leaderboard": leaderboard})
}

// Helper: Convert deck slice to string for Redis
func deckToString(deck []string) string {
	return fmt.Sprintf("%q", deck)
}

// Helper: Convert Redis string back to deck slice
func stringToDeck(deckStr string) []string {
	var deck []string
	fmt.Sscanf(deckStr, "%q", &deck)
	return deck
}
