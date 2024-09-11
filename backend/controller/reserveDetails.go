package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"example.com/project-sa-g03/config"
	"example.com/project-sa-g03/entity"
)

// POST /users
func CreateReserveDetails(c *gin.Context) {
	var reserveDetails entity.ReserveDetails

	// bind เข้าตัวแปร Lock
	if err := c.ShouldBindJSON(&reserveDetails); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()


	// สร้าง Lock
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

// GET /user/:id
func GetReserveDetails(c *gin.Context) {
		var reservesDetails []entity.ReserveDetails
		db := config.DB()
		db.Find(&reservesDetails)
		c.JSON(http.StatusOK, &reservesDetails)
}

// GET /users
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

// DELETE /users/:id
func DeleteReserveDetails(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM reserve_details WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// PATCH /locks
func UpdateReserveDetails(c *gin.Context) {
	var reserveDetails entity.ReserveDetails

	ReserveDetailsID := c.Param("id")

	db := config.DB()
	result := db.First(&reserveDetails, ReserveDetailsID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&reserveDetails); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&reserveDetails)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}