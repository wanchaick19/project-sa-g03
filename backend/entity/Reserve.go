package entity
import (
	"time"
	"gorm.io/gorm"
)
type Reserve struct {
	gorm.Model
	Date time.Time
	
	ShopID uint
	Shop Shop `gorm:"foreignKey:ShopID"`

	TotalPrice float32

	Status string
	
	ReserveDetails []ReserveDetails `gorm:"foreignKey:ReserveID"`

	Payment []Payment `gorm:"foreignKey:ReserveID"`
}