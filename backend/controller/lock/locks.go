package controller

import (
	"example.com/project-sa-g03/config"
	"example.com/project-sa-g03/entity"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"strconv" // import strconv เพื่อใช้แปลง string เป็น int
)

// POST /Movies
func CreateLock(c *gin.Context) {
	var Lock entity.Locks

	// bind เข้าตัวแปร Movie
	if err := c.ShouldBindJSON(&Lock); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// สร้าง Movie
	u := entity.Locks{
		Id:        Lock.Id,        // ตั้งค่าฟิลด์ FirstName
		Movie_poster:      Movie.Movie_poster,      // ตั้งค่าฟิลด์ LastName
		Movie_information: Movie.Movie_information, // ตั้งค่าฟิลด์ Email
		Movie_video:       Movie.Movie_video,
		Movie_length:      Movie.Movie_length,
	}

	// บันทึก
	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": u})
}

// GET /Movies
func ListMovies(c *gin.Context) {

	// Define a slice to hold user records
	var Movie []entity.Movie

	// Get the database connection
	db := config.DB()

	// Query the user table for basic user data
	results := db.Select("id, Movie_name, Movie_poster, Movie_information, Movie_video , Movie_length").Find(&Movie)

	// Check for errors in the query
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	// Return the results as JSON
	c.JSON(http.StatusOK, Movie)
}

// DELETE /Movies/:id
func DeleteMovie(c *gin.Context) {
    id := c.Param("id")

    // ตรวจสอบค่า id ที่ได้รับ
    log.Println("ID received:", id)

    // แปลง id จาก string เป็น int
    intID, err := strconv.Atoi(id)
    if err != nil {
        log.Println("Invalid ID format")
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
        return
    }

    db := config.DB()
    var movie entity.Movie
    if err := db.Where("id = ?", intID).First(&movie).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
        return
    }

    if err := db.Delete(&movie).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})
}

// PATCH /Movies
func UpdateMovie(c *gin.Context) {
	var Movie entity.Movie

	MovieID := c.Param("id")

	db := config.DB()
	result := db.First(&Movie, MovieID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&Movie); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&Movie)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}