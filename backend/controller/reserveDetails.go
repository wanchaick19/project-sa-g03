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

	var reserveDetails []entity.ReserveDetails

	db := config.DB()
	results := db.Preload("Id").Find(&reserveDetails)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, reserveDetails)
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