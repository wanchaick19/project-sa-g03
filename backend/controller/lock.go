package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"example.com/project-sa-g03/config"
	"example.com/project-sa-g03/entity"
)

// GET /locks
func GetLocks(c *gin.Context) {
		var locks []entity.Lock
		db := config.DB()
		db.Find(&locks)
		c.JSON(http.StatusOK, &locks)
}

// PATCH /locks
func UpdateLock(c *gin.Context) {
	var lock entity.Lock

	LockID := c.Param("id")

	// เชื่อมต่อกับฐานข้อมูล
	db := config.DB()
	result := db.Where("id = ?", LockID).First(&lock)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ID not found"})
		return
	}

	// อัปเดตข้อมูล
	lock.Status = "ไม่ว่าง"

	// บันทึกการเปลี่ยนแปลงไปยังฐานข้อมูล
	result = db.Save(&lock)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to update lock"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successfully"})
}

func CancelLock(c *gin.Context) {
	var lock entity.Lock

	LockID := c.Param("id")

	// เชื่อมต่อกับฐานข้อมูล
	db := config.DB()
	result := db.Where("id = ?", LockID).First(&lock)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ID not found"})
		return
	}

	// อัปเดตข้อมูล
	lock.Status = "ว่าง"

	// บันทึกการเปลี่ยนแปลงไปยังฐานข้อมูล
	result = db.Save(&lock)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to update lock"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "cancel locks successfully"})
}

