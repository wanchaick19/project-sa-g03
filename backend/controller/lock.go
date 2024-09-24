package controller

import (
	"database/sql"
	"net/http"

	"example.com/project-sa-g03/config"
	"example.com/project-sa-g03/entity"
	"github.com/gin-gonic/gin"
)

// POST /users
func CreateLock(c *gin.Context) {
	var lock entity.Lock

	// bind เข้าตัวแปร Lock
	if err := c.ShouldBindJSON(&lock); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// ตรวจสอบว่า Id ซ้ำหรือไม่
	var existingLock entity.Lock
	if err := db.Where("id = ?", lock.Id).First(&existingLock).Error; err == nil {
		// ถ้าเจอ Lock ที่มี Id ซ้ำ
		c.JSON(http.StatusBadRequest, gin.H{"error": "ล็อคนี้มีอยู่แล้ว"})
		return
	}

	// สร้าง Lock ใหม่
	u := entity.Lock{
		Id:     lock.Id,
		Status: lock.Status,
		Price:  lock.Price,
		Size:   lock.Size,
	}

	// บันทึก
	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": u})
}

// GET /user/:id
func GetLockById(c *gin.Context) {
	id := c.Param("id")
	var lock entity.Lock
	db := config.DB()
	result := db.First(&lock, "id = ?", id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, lock)
}

// GET /users
func ListLocks(c *gin.Context) {

	var locks []entity.Lock

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
	if tx := db.Exec("DELETE FROM locks WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// PATCH /locks
func UpdateLock(c *gin.Context) {
	var lock entity.Lock

	// ดึง ID จาก URL parameters
	LockID := c.Param("id")

	// สร้าง instance ของ DB
	db := config.DB()

	// ค้นหาล็อคด้วย ID
	result := db.First(&lock, "id = ?", LockID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	// Bind ข้อมูลจาก request body
	if err := c.ShouldBindJSON(&lock); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	// อัปเดตข้อมูล
	result = db.Save(&lock)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}

// โค้ดใน Go (Gin)
// Go (Gin) example
func ClearStatus(c *gin.Context) {
	var updateRequest struct {
		StatusToClear string `json:"statusToClear"`
		NewStatus     string `json:"newStatus"`
	}

	// Bind ข้อมูลจาก request body
	if err := c.ShouldBindJSON(&updateRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	// ตรวจสอบค่าที่ได้รับ
	if updateRequest.StatusToClear == "" || updateRequest.NewStatus == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input data"})
		return
	}

	// สร้าง instance ของ DB
	db := config.DB()

	// อัปเดตข้อมูล
	result := db.Model(&entity.Lock{}).Where("status = ?", updateRequest.StatusToClear).Update("status", updateRequest.NewStatus)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to update status"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true})
}

func CountShops(c *gin.Context) {
	var count int64
	db := config.DB()

	// นับจำนวนร้านค้า
	result := db.Model(&entity.Shop{}).Count(&count)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"totalShops": count})
}

func CountUsers(c *gin.Context) {
	var count int64
	db := config.DB()

	// นับจำนวนผู้ใช้
	result := db.Model(&entity.Users{}).Count(&count)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"totalUsers": count})
}

func CountReservations(c *gin.Context) {
	var totalReservationsPrice sql.NullFloat64

	db := config.DB()
	result := db.Table("reserves").
    Select("SUM(total_price)").
    Where("status = ?", "ชำระเงินแล้ว").
    Scan(&totalReservationsPrice)


	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	// ตรวจสอบว่า totalReservationsPrice.Valid เป็น true หรือไม่
	if totalReservationsPrice.Valid {
		c.JSON(http.StatusOK, gin.H{"totalReservationsPrice": totalReservationsPrice.Float64})
	} else {
		c.JSON(http.StatusOK, gin.H{"totalReservationsPrice": 0})
	}
}

func GetDashboardData(c *gin.Context) {
	type DashboardData struct {
		TotalShops             int64   `json:"totalShops"`
		TotalUsers             int64   `json:"totalUsers"`
		TotalReservationsPrice float64 `json:"totalReservationsPrice"`
	}

	var data DashboardData
	db := config.DB()

	// Query for total shops
	result := db.Model(&entity.Shop{}).Count(&data.TotalShops)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch total shops"})
		return
	}

	// Query for total users
	result = db.Model(&entity.Users{}).Count(&data.TotalUsers)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch total users"})
		return
	}

	// Query for total reservations price
	var totalReservationsPrice sql.NullFloat64
	result = db.Table("reserves").Select("SUM(total_price)").Where("status = ?", "ชำระเงินแล้ว").Scan(&totalReservationsPrice)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch total reservations price"})
		return
	}

	// ตรวจสอบว่า totalReservationsPrice.Valid เป็น true หรือไม่
	if totalReservationsPrice.Valid {
		data.TotalReservationsPrice = totalReservationsPrice.Float64
	} else {
		data.TotalReservationsPrice = 0
	}

	c.JSON(http.StatusOK, data)
}

// PATCH /locks/:id/status
func UpdateLockStatus(c *gin.Context) {
	var requestBody struct {
		Status string `json:"status"`
	}

	// ดึง ID จาก URL parameters
	LockID := c.Param("id")

	// Bind ข้อมูลจาก request body (เฉพาะ status)
	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	// สร้าง instance ของ DB
	db := config.DB()

	// ค้นหาล็อคด้วย ID
	var lock entity.Lock
	result := db.First(&lock, "id = ?", LockID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	// อัปเดตสถานะใหม่
	lock.Status = requestBody.Status
	if err := db.Save(&lock).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update status"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful", "data": lock})
}