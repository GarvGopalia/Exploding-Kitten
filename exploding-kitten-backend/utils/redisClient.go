// Redis client setup...
package main

import (
	"context"
	"fmt"

	"github.com/go-redis/redis/v8"
)

var ctx = context.Background()

// InitializeRedisClient sets up a new Redis client and tests the connection
func InitializeRedisClient() *redis.Client {
	// Configure Redis client
	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379", // Redis server address
		Password: "",               // No password set
		DB:       0,                // Default DB
	})

	// Test the connection
	_, err := client.Ping(ctx).Result()
	if err != nil {
		fmt.Println("Could not connect to Redis:", err)
		panic(err)
	}

	fmt.Println("Connected to Redis")
	return client
}
