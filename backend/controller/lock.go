package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"example.com/project-sa-g03/config"
	"example.com/project-sa-g03/entity"
)

// POST /users
func CreateLock(c *gin.Context) {
	var lock entity.Locks

	// bind เข้าตัวแปร Lock
	if err := c.ShouldBindJSON(&lock); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()


	// สร้าง Lock
	u := entity.Locks{
		Id: lock.Id, 
		Status: lock.Status, 
		Price: lock.Price,    
		Size: lock.Size,

	}

	// บันทึก
	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": u})
}

// GET /user/:id
func GetLocks(c *gin.Context) {
	ID := c.Param("Id")
	var lock entity.Locks

	db := config.DB()
	results := db.Preload("Id").First(&lock, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if lock.Id == "A00" {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, lock)
}

// GET /users
func ListLocks(c *gin.Context) {

	var locks []entity.Locks

	db := config.DB()
	results := db.Preload("Id").Find(&locks)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, locks)
}

// DELETE /users/:id
func DeleteLock(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM lock WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// PATCH /locks
func UpdateLock(c *gin.Context) {
	var lock entity.Locks

	LockID := c.Param("id")

	db := config.DB()
	result := db.First(&lock, LockID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&lock); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&lock)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}