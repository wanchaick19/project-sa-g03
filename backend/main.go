package main

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"example.com/project-sa-g03/config"
	"example.com/project-sa-g03/controller"

	"example.com/project-sa-g03/controller/gender"

	"example.com/project-sa-g03/controller/users"

	"example.com/project-sa-g03/middlewares"
)


const PORT = "8000"


func main() {


   // open connection database

   config.ConnectionDB()


   // Generate databases

   config.SetupDatabase()


   r := gin.Default()


   r.Use(CORSMiddleware())


   // Auth Route

   r.POST("/signup", users.SignUp)

   r.POST("/signin", users.SignIn)

   r.POST("/createreserve", controller.CreateReserve)

   r.POST("/createdetails", controller.CreateReserveDetails)

   r.POST("/createshop", controller.CreateShop)

   r.PUT("/resetlocks", controller.ResetLock)

   r.POST("/createreview", controller.CreateReview)


   router := r.Group("/")

   {

       router.Use(middlewares.Authorizes())


       // User Route

       router.PUT("/user/:id", users.Update)

       router.GET("/users", users.GetAll)

       router.GET("/user/:id", users.GetUser)

       router.GET("/users/:id", users.GetUserbyUserID)

       router.DELETE("/user/:id", users.Delete)

       router.GET("/shopbyuser/:id", controller.GetShopbyUser)

       router.GET("/reserves/:id", controller.ListReserve)

       router.GET("/reservesdetails/:id", controller.ListReservesDetails)

       router.PUT("/updatelock/:id", controller.UpdateLock)

       router.PUT("/cancelLock/:id", controller.CancelLock)

       router.PUT("/cancelReserve/:id", controller.CancelReserve)

   }


   r.GET("/genders", genders.GetAll)

   r.GET("/locks",controller.GetLocks)

   r.GET("/categories",controller.GetCategories)

   r.GET("/getshops",controller.GetShops)

   r.GET("/shop/:id",controller.GetShopByID)


   r.GET("/", func(c *gin.Context) {

       c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)

   })


   // Run the server


   r.Run("localhost:" + PORT)


}


func CORSMiddleware() gin.HandlerFunc {

   return func(c *gin.Context) {

       c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

       c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

       c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

       c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")


       if c.Request.Method == "OPTIONS" {

           c.AbortWithStatus(204)

           return

       }


       c.Next()

   }

}