package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"example.com/project-sa-g03/config"
	"example.com/project-sa-g03/entity"
	"gorm.io/gorm"
    "errors"
)

// POST /users
func CreateShop(c *gin.Context) {
	var shop entity.Shop

	// bind เข้าตัวแปร Lock
	if err := c.ShouldBindJSON(&shop); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()


	// สร้าง Lock
	s := entity.Shop{
		NationalID: shop.NationalID,
		CategoryID: shop.CategoryID,
		ShopName: shop.ShopName,
		Description: shop.Description,
		ShopImg: shop.ShopImg,
		UserID: shop.UserID,
	}

	// บันทึก
	if err := db.Create(&s).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": s})
}

// GET /user/:id
func GetShops(c *gin.Context) {
		var shop []entity.Shop
		db := config.DB()
		db.Find(&shop)
		c.JSON(http.StatusOK, &shop)
}

// GET /users
func ListShops(c *gin.Context) {

	var shop []entity.Shop

	db := config.DB()
	results := db.Preload("Id").Find(&shop)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, shop)
}

// DELETE /users/:id
func DeleteShop(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM shops WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

func GetShopbyUser(c *gin.Context) {
	ID := c.Param("id")
	var user entity.Shop

	db := config.DB()


	// Query the user by ID
	results := db.Where("user_id = ?", ID).First(&user)
	if results.Error != nil {
		if errors.Is(results.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, user)
}

// PATCH /locks
func UpdateShop(c *gin.Context) {
	var shop entity.Shop

	ShopID := c.Param("id")

	db := config.DB()
	result := db.First(&shop, ShopID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&shop); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&shop)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}