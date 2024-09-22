package users


import (

   "net/http"


   "github.com/gin-gonic/gin"


   "example.com/project-sa-g03/config"
    
   "example.com/project-sa-g03/entity"
    "gorm.io/gorm"
    "errors"
)


func GetAll(c *gin.Context) {


   var users []entity.Users


   db := config.DB()

   results := db.Preload("Gender").Find(&users)

   if results.Error != nil {

       c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})

       return

   }

   c.JSON(http.StatusOK, users)


}


func GetUser(c *gin.Context) {
	ID := c.Param("id")
	var user entity.Users

	db := config.DB()


	// Query the user by ID
	results := db.Where("id = ?", ID).First(&user)
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


func Update(c *gin.Context) {
    var user entity.Users
    UserID := c.Param("id")

    db := config.DB()

    result := db.First(&user, UserID)
    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
        return
    }

    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
        return
    }

    // หากมีการส่งรหัสผ่านใหม่มา ให้ทำการเข้ารหัส
    if user.Password != "" {
        hashedPassword, _ := config.HashPassword(user.Password)
        user.Password = hashedPassword
    }

    result = db.Save(&user)
    if result.Error != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Updated successfully"})
}

 