package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"example.com/project-sa-g03/config"
	"example.com/project-sa-g03/entity"
	"gorm.io/gorm"
    "errors"
)

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

func CreateShop(c *gin.Context) {
	var shop entity.Shop

	// bind เข้าตัวแปร Lock
	if err := c.ShouldBindJSON(&shop); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()


	// สร้าง Reserve
	r := entity.Shop{
		NationalID: shop.NationalID, 
		CategoryID: shop.CategoryID,    
		ShopName: shop.ShopName,
		Description: shop.Description,
		ShopImg: shop.ShopImg,
		UserID: shop.UserID,
	}

	// บันทึก
	if err := db.Create(&r).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": r})
}

func GetShops(c *gin.Context) {
	var shops []entity.Shop
	db := config.DB()
	db.Find(&shops)
	c.JSON(http.StatusOK, &shops)
}

func GetShopByID(c *gin.Context) {
    ID := c.Param("id") // Get the shop ID from the URL parameter
    var shop entity.Shop

    db := config.DB()

    // Query the shop by shop ID
    results := db.Where("id = ?", ID).First(&shop) // Adjust this line to query by shop ID
    if results.Error != nil {
        if errors.Is(results.Error, gorm.ErrRecordNotFound) {
            c.JSON(http.StatusNotFound, gin.H{"error": "Shop not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        }
        return
    }

    c.JSON(http.StatusOK, shop)
}
