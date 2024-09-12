package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"example.com/project-sa-g03/config"
	"example.com/project-sa-g03/entity"
)

// POST /reserveDetails
func CreateReserveDetails(c *gin.Context) {
	var reserveDetails entity.ReserveDetails

	// bind เข้าตัวแปร reserveDetails
	if err := c.ShouldBindJSON(&reserveDetails); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()


	// สร้าง reserveDetails
	r := entity.ReserveDetails{
		ReserveID: reserveDetails.ReserveID,
		LockID: reserveDetails.LockID,
		Price: reserveDetails.Price,
	}

	// บันทึก
	if err := db.Create(&r).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": r})
}

// GET /reserveDetails
func ListReservesDetails(c *gin.Context) {

	// Get the ID parameter from the URL
	ID := c.Param("id")

	// Define a struct to hold the result set
	var reservesdetails []struct {
		LockID   string    `json:"lock_id"`   // ShopName from the shops table
		Price float32   `json:"price"` // TotalPrice from the reserves table
	}

	// Get the database connection
	db := config.DB()

	// Query to join reserves and shops tables, select the required fields, and order by date in descending order
	results := db.Table("reserve_details").
		Select("reserve_details.lock_id, reserve_details.price").
		Joins("left join reserves on reserve_details.reserve_id = reserves.id").
		Where("reserves.id = ?", ID). // Filter by shop ID matching the parameter received
		Order("reserve_details.lock_id "). // Order by Date in descending order
		Scan(&reservesdetails) // Scan the results into the reserves struct

	// Check for errors in the query
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	// Return the results as JSON
	c.JSON(http.StatusOK, reservesdetails)
}
