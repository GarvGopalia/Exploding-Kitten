// Helper functions...
package main

import (
	"encoding/json"
	"fmt"
)

// Convert a deck (slice of strings) to a JSON string for storage in Redis
func deckToString(deck []string) string {
	data, err := json.Marshal(deck)
	if err != nil {
		fmt.Println("Error converting deck to string:", err)
		return ""
	}
	return string(data)
}

// Convert a JSON string back to a deck (slice of strings)
func stringToDeck(deckStr string) []string {
	var deck []string
	err := json.Unmarshal([]byte(deckStr), &deck)
	if err != nil {
		fmt.Println("Error converting string to deck:", err)
		return nil
	}
	return deck
}
