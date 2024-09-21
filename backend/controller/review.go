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
Score: reviews.Score,
Description: reviews.Description,
DATETIME: reviews.DATETIME, // Ensure this matches your model's type
ShopID: reviews.ShopID,
UserID: reviews.UserID,

}
// Save review to the database
if err := db.Create(&review).Error; err != nil {
c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
return
}
c.JSON(http.StatusCreated, gin.H{"message": "Review created successfully", 
"data": review})
}
//GetReviewsByShopId
// GET /shop/:id/review
func GetReviewsByShopId(c *gin.Context) {
shopID := c.Param("id")
db := config.DB()
var reviews []entity.Review
// Find all reviews associated with the given ShopID and preload users
if err := db.Where("shop_id = ?", shopID).Find(&reviews).Error; err != nil {
c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
return
}
c.JSON(http.StatusOK, gin.H{"data": reviews})
}

// PUT /reviews/:id
func UpdateReview(c *gin.Context) {
 var reviewUpdate entity.Review
 reviewID := c.Param("id")
 // Bind JSON data to the reviewUpdate struct
 if err := c.ShouldBindJSON(&reviewUpdate); err != nil {
 c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
 return
 }
 db := config.DB()
 var review entity.Review
 // Find the review by ID
 if err := db.First(&review, reviewID).Error; err != nil {
 c.JSON(http.StatusNotFound, gin.H{"error": "Review not found"})
 return
 }
 // Update review fields
 review.Score = reviewUpdate.Score
 review.Description = reviewUpdate.Description
 review.DATETIME = reviewUpdate.DATETIME // Ensure this matches your model's type
 // Save the updated review to the database
 if err := db.Save(&review).Error; err != nil {
 c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
 return
 }
 c.JSON(http.StatusOK, gin.H{"message": "Review updated successfully", "data": 
review})
} 
