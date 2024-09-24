package entity

import(
 "time"
 "gorm.io/gorm"
)
type Review struct {
	gorm.Model 
	Score float64 `gorm:"not null"`
	Description string `gorm:"type:text"`
	DATETIME time.Time `gorm:"not null"` 
	ShopID uint `gorm:"not null"`
	UserID uint `gorm:"not null"`
} 