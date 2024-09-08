package entity

import "gorm.io/gorm"

type Users struct {
	gorm.Model
	Email string
	Password string
	FirstName string
	LastName string
	Tel string
	Profile string
	GenderID uint

	Shops []Shop `gorm:"foreignKey:UserID"`
	
}