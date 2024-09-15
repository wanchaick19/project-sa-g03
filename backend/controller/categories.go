package controller


import (

   "net/http"


   "github.com/gin-gonic/gin"


   "example.com/project-sa-g03/config"
    
   "example.com/project-sa-g03/entity"
)


func GetCategories(c *gin.Context) {
	var categories []entity.Categories
	db := config.DB()
	db.Find(&categories)
	c.JSON(http.StatusOK, &categories)
}