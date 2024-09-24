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

   //users
   r.POST("/signup", users.SignUp)
   r.POST("/signin", users.SignIn)

   //reserve
   r.POST("/createreserve", controller.CreateReserve)
   r.POST("/createdetails", controller.CreateReserveDetails)


   //shop
   r.POST("/createshop", controller.CreateShop)

   //review
   r.POST("/createreview", controller.CreateReview)

   //payment
   r.POST("/payments", controller.CreatePayment)

   //managelocks
    r.PATCH("/locks", controller.ClearStatus)
	r.POST("/locks", controller.CreateLock)
	r.GET("/locks/:id", controller.GetLockById)
	r.PUT("/locks/:id", controller.UpdateLock)
	r.PUT("/locks/:id/update", controller.UpdateLockStatus)
	r.POST("/clear-status", controller.ClearStatus)
	r.GET("/api/count-shops", controller.CountShops)
	r.GET("/api/count-users", controller.CountUsers)
	r.GET("/api/sum-reservations", controller.CountReservations)
	r.GET("/api/dashboard", controller.GetDashboardData)
	r.DELETE("/locks/:id", controller.DeleteLock)
   
   router := r.Group("/")

   {

       router.Use(middlewares.Authorizes())


       // User Route

       //users
       router.PUT("/user/:id", users.Update)
       router.GET("/users", users.GetAll)

       //reserve
       router.GET("/shopbyuser/:id", controller.GetShopbyUser)
       router.GET("/reserves/:id", controller.ListReserve)
       router.GET("/reservesdetails/:id", controller.ListReservesDetails)
       router.PUT("/updatelock/:id", controller.ReserveLock)
       router.PUT("/cancelLock/:id", controller.CancelLock)
       router.PUT("/cancelReserve/:id", controller.CancelReserve)

       //payment
       router.GET("/reserve/:id", controller.GetReserveById)
       router.PUT("reserve/:id",controller.UpdateReserveStatus)

       

   }

   //
   r.GET("/user/:id", users.GetUser)

   //gender
   r.GET("/genders", genders.GetAll)

   //locks
   r.GET("/locks",controller.GetLocks)

   //map
   r.GET("/getmaps",controller.ListMap)

   //payment
   r.GET("/payments/:id", controller.ListPayment)

   //review
    r.GET("/categories",controller.GetCategories)
    r.GET("/getshops",controller.GetShops)
    r.GET("/shop/:id",controller.GetShopByID)
    r.GET("/shop/:id/review", controller.GetReviewsByShopId)



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