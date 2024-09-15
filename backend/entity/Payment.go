package entity

import (
	"time"

	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model
	DateTime time.Time
	TotalPrice  float32
	
	ReserveID uint
}
