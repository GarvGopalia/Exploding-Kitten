// Golang main application entry point...
package main

import (
    "log"
    "net/http"

    "github.com/gin-gonic/gin"
    "github.com/go-redis/redis/v8"
    "context"
)

var redisClient *redis.Client

func initRedis() {
    redisClient = redis.NewClient(&redis.Options{
        Addr: "localhost:6379", // Replace with your Redis server address
    })

    if _, err := redisClient.Ping(context.Background()).Result(); err != nil {
        log.Fatalf("Could not connect to Redis: %v", err)
    }
    log.Println("Connected to Redis")
}

func main() {
    initRedis()

    router := gin.Default()

    router.GET("/leaderboard", func(c *gin.Context) {
        // Example leaderboard endpoint
        leaderboard, err := redisClient.ZRevRangeWithScores(context.Background(), "leaderboard", 0, -1).Result()
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }
        c.JSON(http.StatusOK, leaderboard)
    })

    log.Println("Server running on http://localhost:8080")
    if err := router.Run(":8080"); err != nil {
        log.Fatalf("Could not start server: %v", err)
    }
}
