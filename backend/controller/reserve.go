package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"example.com/project-sa-g03/config"
	"example.com/project-sa-g03/entity"
	"time"
)

// POST /reserve
func CreateReserve(c *gin.Context) {
	var reserve entity.Reserve

	// bind เข้าตัวแปร Lock
	if err := c.ShouldBindJSON(&reserve); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()


	// สร้าง Reserve
	r := entity.Reserve{
		Date: reserve.Date, 
		ShopID: reserve.ShopID,    
		TotalPrice: reserve.TotalPrice,
	}

	// บันทึก
	if err := db.Create(&r).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": r})
}


// GET /reserves
func ListReserve(c *gin.Context) {
	// Get the ID parameter from the URL
	ID := c.Param("id")

	// Define a struct to hold the result set
	var reserves []struct {
		Date       time.Time `json:"date"`        // Date from the reserves table
		ShopName   string    `json:"shop_name"`   // ShopName from the shops table
		TotalPrice float32    `json:"total_price"` // TotalPrice from the reserves table
		ID uint    `json:"id"` // TotalPrice from the reserves table
	}

	// Get the database connection
	db := config.DB()

	// Query to join reserves and shops tables, select the required fields, and order by date in descending order
	results := db.Table("reserves").
		Select("reserves.date, shops.shop_name, reserves.total_price, reserves.id").
		Joins("left join shops on reserves.shop_id = shops.id").
		Where("shops.id = ?", ID). // Filter by shop ID matching the parameter received
		Order("reserves.date DESC"). // Order by Date in descending order
		Scan(&reserves) // Scan the results into the reserves struct

	// Check for errors in the query
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	// Return the results as JSON
	c.JSON(http.StatusOK, reserves)
}
