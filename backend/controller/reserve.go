package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"example.com/project-sa-g03/config"
	"example.com/project-sa-g03/entity"

)

// POST /users
func CreateReserve(c *gin.Context) {
	var reserve entity.Reserve

	// bind เข้าตัวแปร Lock
	if err := c.ShouldBindJSON(&reserve); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()


	// สร้าง Lock
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

// GET /user/:id
func GetReserves(c *gin.Context) {
		var reserves []entity.Reserve
		db := config.DB()
		db.Find(&reserves)
		c.JSON(http.StatusOK, &reserves)
}

// GET /users
func ListReserves(c *gin.Context) {

	var reserve []entity.Reserve

	db := config.DB()
	results := db.Preload("Shop").Find(&reserve)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, reserve)
}

// DELETE /users/:id
func DeleteReserve(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM reserves WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// PATCH /locks
func UpdateReserve(c *gin.Context) {
	var reserve entity.Reserve

	ReserveID := c.Param("id")

	db := config.DB()
	result := db.First(&reserve, ReserveID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&reserve); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&reserve)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}

// func GetReservebyShop(c *gin.Context) {
// 	ID := c.Param("id")
// 	var reserve entity.Reserve

// 	db := config.DB()

// 	// Query the reserve by shop_id, sorted by date in descending order and limit to 1
// 	results := db.Where("shop_id = ?", ID).Order("date DESC").Limit(1).First(&reserve)
// 	if results.Error != nil {
// 		if errors.Is(results.Error, gorm.ErrRecordNotFound) {
// 			c.JSON(http.StatusNotFound, gin.H{"error": "Reserve not found"})
// 		} else {
// 			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
// 		}
// 		return
// 	}

// 	c.JSON(http.StatusOK, reserve)
// }
