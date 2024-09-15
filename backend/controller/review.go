package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"example.com/project-sa-g03/config"
	"example.com/project-sa-g03/entity"
)

// POST /reviews
func CreateReview(c *gin.Context) {
	var reviews entity.Review

	// Bind JSON data to the reviewDetails struct
	if err := c.ShouldBindJSON(&reviews); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// Create review record
	review := entity.Review{
		Score:       reviews.Score,
		Description: reviews.Description,
		DATETIME:    reviews.DATETIME, // Ensure this matches your model's type
		ShopID:      reviews.ShopID,
		UserID:      reviews.UserID,
	}

	// Save review to the database
	if err := db.Create(&review).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Review created successfully", "data": review})
}
