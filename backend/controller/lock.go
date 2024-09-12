package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"example.com/project-sa-g03/config"
	"example.com/project-sa-g03/entity"
)

// GET /locks
func GetLocks(c *gin.Context) {
		var locks []entity.Locks
		db := config.DB()
		db.Find(&locks)
		c.JSON(http.StatusOK, &locks)
}

// PATCH /locks
func UpdateLock(c *gin.Context) {
	var lock entity.Locks
	var updatedData entity.Locks

	LockID := c.Param("id")

	// เชื่อมต่อกับฐานข้อมูล
	db := config.DB()
	result := db.Where("id = ?", LockID).First(&lock)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ID not found"})
		return
	}

	// ตรวจสอบและเชื่อมโยงข้อมูลจาก JSON Payload
	if err := c.ShouldBindJSON(&updatedData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	// อัปเดตข้อมูล
	lock.Status = updatedData.Status
	lock.Size = updatedData.Size
	lock.Price = updatedData.Price

	// บันทึกการเปลี่ยนแปลงไปยังฐานข้อมูล
	result = db.Save(&lock)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to update lock"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successfully"})
}


func ResetLock(c *gin.Context) {
    // เชื่อมต่อกับฐานข้อมูล
    db := config.DB()

    // ใช้ Model กับ Where("1 = 1") เพื่ออัปเดตสถานะทั้งหมด
    result := db.Model(&entity.Locks{}).Where("Status = ?","ไม่ว่าง").Update("Status", "ว่าง")
    if result.Error != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to reset locks status"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "All locks have been reset to 'ว่าง' successfully"})
}


