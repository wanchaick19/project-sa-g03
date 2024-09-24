package entity

import (
	"time"

	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model
	Date      time.Time
	TotalPrice float32
	Slip      string `gorm:"type:longtext"` // Corrected struct tag syntax
	
	ReserveID uint
	Reserve Reserve `gorm:"foreignKey:ReserveID"`
}