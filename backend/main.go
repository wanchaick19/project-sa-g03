package main


import (
	"net/http"
	"example.com/project-sa-g03/entity"
	"example.com/project-sa-g03/controller"
	"github.com/gin-gonic/gin"
  "gorm.io/gorm"
  "gorm.io/driver/sqlite"
)

const PORT = "8000"

func main() {
  db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
  if err != nil {
    panic("failed to connect database")
  }

  // Migrate the schema
  db.AutoMigrate(&entity.Lock{})

  r := gin.Default()

	r.Use(CORSMiddleware())

	router := r.Group("")
	{

		// User Routes
		router.GET("/locks", controller.ListLocks)
		router.GET("/lock/:id", controller.GetLock)
		router.POST("/locks", controller.CreateLock)
		router.PATCH("/locks", controller.UpdateLock)
		router.DELETE("/lock/:id", controller.DeleteLock)

	}

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
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}