
package entity

import (
	"gorm.io/gorm"
	"time"
	
)

type Payment struct {
	gorm.Model
	Name      string
	Date      time.Time
	TotalPrice float32
	Slip      string `gorm:"type:longtext"` // Corrected struct tag syntax
	
	ReserveID uint
	Reserve Reserve `gorm:"foreignKey:ReserveID"`
}