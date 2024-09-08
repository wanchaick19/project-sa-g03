package genders


import (

   "net/http"


   "example.com/project-sa-g03/config"

   "example.com/project-sa-g03/entity"

   "github.com/gin-gonic/gin"

)


func GetAll(c *gin.Context) {


   db := config.DB()


   var genders []entity.Gender

   db.Find(&genders)


   c.JSON(http.StatusOK, &genders)


}