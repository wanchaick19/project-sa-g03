package entity
import (
	"time"
	"gorm.io/gorm"
)
type Reserve struct {
	gorm.Model
	Date time.Time
	
	ShopID *uint
	Shop Shop `gorm:"foreignKey:ShopID"`
	
	ReserveDetails []ReserveDetails `gorm:"foreignKey:ReserveID"`
}